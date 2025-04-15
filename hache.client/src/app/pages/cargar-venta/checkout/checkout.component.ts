import { Component, computed, EventEmitter, Output, signal } from '@angular/core';
import { ArticuloCarrito } from '../../../core/models/articulo-carrito';
import { MedioDePago } from '../../../core/models/medio-de-pago';
import { CarritoServiceService } from '../../../core/services/carrito-service.service';
import { MedioDePagoService } from '../../../core/services/medio-de-pago.service';
import { VentasService } from '../../../core/services/ventas.service';
import { VentaDTO } from '../../../core/DTOs/venta.dto';
import { DetalleVentaDTO } from '../../../core/DTOs/detalle-venta.dto';
import Swal from 'sweetalert2';
import { StockServiceService } from '../../../core/services/stock-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  @Output() cerrarModal = new EventEmitter<void>(); // Notifica cuando se cierra el modal

  mostrarModal = true;

  mediosDePago: MedioDePago[] = []; //Se cargan de la DB los medios de pago existenes
  medioDePago: MedioDePago | null = null;   //Se asigna el medio de pago de la venta, tiene por defecto null

  pedidoYa = signal(false); //true o false si la venta se realiza en PedidosYa

  metodoSeleccionado: string = '';
  subtotal = computed(() => {
    const carrito = this.carrito();
    let subtotalCalculado = 0;

    carrito.forEach(item => {
      const precio = this.pedidoYa() ? ((item.articulo.precio * item.cantidad) - item.montoDescuento) / 0.82 : ((item.articulo.precio * item.cantidad) - item.montoDescuento);
      subtotalCalculado += precio;
    });

    return subtotalCalculado;
  });



  tipoDescuento: string = 'porcentaje';
  totalConDescuento = computed(() => this.subtotal() - this.montoDescuento());
  numeroDescuento: number = 0; //puede ser un numero porcentual o un monto fijo, es el numero que viene del input del HTML.
  montoDescuento = signal(0); //este numero debe calcular siempre el subtotal - el descuento


  //Datos que se obtienen del localStorage para completar los datos de la venta
  idLocal: number = 0;
  idTipoUsuario: number = 0;
  nombreUsuario: string = '';
  nombreCompleto: string = '';

  constructor(
    private carritoService: CarritoServiceService,
    private ventaService: VentasService,
    private medioDePagoService: MedioDePagoService,
    private stockService: StockServiceService
  ) { }

  ngOnInit() {
    this.cargarDatosUsuario();
    this.cargarMediosDePago();
  }

  ngDoCheck() {
    this.aplicarDescuento();
    console.log('DoCheck');
  }

  get pedidoYaModel() {
    return this.pedidoYa();
  }

  set pedidoYaModel(valor: boolean) {
    this.pedidoYa.set(valor);
  }


  actualizarData() {
    //ESTE METODO SE EJECUTA AL ELIMINAR UN ARTICULO DEL CARRITO QUE ESTÁ DENTRO DEL MODAL (Emitido desde modal-carrito-item.ts)
    //Como la data necesaria se actualiza con el DoCheck no uso este metodo, pero capaz sea lo mejor en el futuro.
  }

  //ASIGNA EN ARRAY DE MEDIOS DE PAGO LOS MEDIOS DE PAGO QUE NOS TRAE EL BACK Y LA DB
  cargarMediosDePago(): void {
    this.medioDePagoService.obtenerMediosDePago().subscribe(
      (data) => {
        this.mediosDePago = data;


      },
      (error) => {
        console.error('Error al cargar los métodos de pago', error);
      }
    );
  }

  //ASIGNA EN VARIABLES LOS DATOS DEL LOCAL STORAGE DEL USUARIO
  cargarDatosUsuario() {
    this.nombreCompleto = localStorage.getItem('nombreCompleto') || 'Usuario Desconocido';
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || 'Sin usuario';
    this.idLocal = Number(localStorage.getItem('idLocal')) || 1;
    this.idTipoUsuario = Number(localStorage.getItem('userRole')) || 0;
  }

  //retorna array de tipo ArticuloCarrito con los articulos seleccionados
  carrito = computed(() => this.carritoService.carrito());


  //retorna un numero con el subtotal del carrito
  get totalCarrito() {
    return this.carritoService.getTotal();
  }

  cerrar() {
    this.cerrarModal.emit();
  }

  guardarVenta(): void {
    const carrito: ArticuloCarrito[] = this.carritoService.getCarrito();

    if (!carrito || carrito.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Datos incompletos',
        text: 'No se puede guardar una venta sin productos',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    if (!this.medioDePago) {
      Swal.fire({
        icon: 'warning',
        title: 'Medio de pago no seleccionado',
        text: 'Por favor, seleccioná un medio de pago antes de continuar.',
        confirmButtonText: 'Entendido'
      });
      return;
    }
    
    const montoDescuento = 0; //AL AGREGAR LÓGICA DE DESCUENTO A ARTÍCULO CAMBIAR ESTE VALOR

    const detalleVentaDTO: DetalleVentaDTO[] = Array.isArray(carrito) ? carrito.map(item => ({
      iD_Articulo: item.articulo?.id ?? 0, // Asegura que el id sea válido
      cantidad: item.cantidad ?? 1, // Evita valores nulos
      precio_Unitario: item.articulo?.precio ?? 0, // Asegura que el precio sea válido
      precio_Venta: (item.articulo?.precio ?? 0) - (item.montoDescuento ?? 0) / (this.pedidoYa() ? 0.82 : 1) //Precio de Venta, Precio del artículo - Monto de descuento + cargo PedidosYa
    })) : [];

    const venta: VentaDTO = {
      iD_Usuario: Number(localStorage.getItem('idUsuario')) || 1,
      fecha: new Date(),
      subtotal: this.subtotal(),
      total: this.totalConDescuento(),
      iD_MedioDePago: this.medioDePago ? this.medioDePago.id : 0,
      esPedidosYa: this.pedidoYa(),
      iD_Local: this.idLocal,
      detalleVenta: detalleVentaDTO
    };


    this.ventaService.agregarVenta(venta).subscribe({
      next: (respuesta) => {
        this.cerrar();
        this.carritoService.vaciarCarrito();
        this.stockService.emitirActualizacionArticulos();
        Swal.fire({
          title: 'Venta guardada',
          text: 'La venta se ha realizado correctamente.',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false

        });

      },
      error: (error) => {
        console.error('Error al enviar la venta', error);

        const mensaje = typeof error?.error === 'string'
          ? error.error
          : 'Hubo un error al cargar la venta. Intentalo de nuevo.';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: mensaje,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    });

    console.log('Venta cargada: ', venta);
  }


  //ARREGLAR
  aplicarDescuento(): void {
    if (this.tipoDescuento === "porcentaje") {
          this.montoDescuento.set(this.subtotal() * this.numeroDescuento / 100);    
    } else {
      this.montoDescuento.set(this.numeroDescuento);
    }

  }

  validarDescuento(event: any): void {
    let valor = Number(event.target.value);

    if (this.tipoDescuento === "porcentaje") {
      if (valor > 100) {
        valor = 100;
      }
    } else {
      if (valor > this.subtotal()) {
        valor = Number(this.subtotal().toFixed(2));
      }
    }

    event.target.value = valor;
    this.numeroDescuento = valor; // Asegurar que el valor se actualiza en la variable
  }

  validarTipoDescuento(event: any): void {
    if (this.tipoDescuento === "porcentaje" && this.numeroDescuento > 100) {
      this.numeroDescuento = 100; // Ajusta al máximo permitido
    } else if (this.tipoDescuento === "monto" && this.numeroDescuento > this.subtotal()) {
      this.numeroDescuento = Number(this.subtotal().toFixed(2)); // Ajusta al subtotal
    }
  }



  actualizarMedioDePago() {
    const medioSeleccionado = this.mediosDePago.find(m => m.id === this.medioDePago?.id);
    if (medioSeleccionado) {
      this.medioDePago = medioSeleccionado;
    }
  }
}
