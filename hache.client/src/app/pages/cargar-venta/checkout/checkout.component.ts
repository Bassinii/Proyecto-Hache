import { Component, computed, EventEmitter, Output, signal } from '@angular/core';
import { ArticuloCarrito } from '../../../core/models/articulo-carrito';
import { Venta } from '../../../core/models/venta';
import { MedioDePago } from '../../../core/models/medio-de-pago';
import { CarritoServiceService } from '../../../core/services/carrito-service.service';
import { MedioDePagoService } from '../../../core/services/medio-de-pago.service';
import { VentasService } from '../../../core/services/ventas.service';

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

  pedidoYa: boolean = false; //true o false si la venta se realiza en PedidosYa

  metodoSeleccionado: string = '';
  subtotal = signal(0);

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
    private medioDePagoService: MedioDePagoService
  ) { }

  ngOnInit() {
    this.subtotal.set(this.totalCarrito);
    this.cargarDatosUsuario();
    this.cargarMediosDePago();
  }

  ngDoCheck() {
    this.subtotal.set(this.totalCarrito);
    this.aplicarPrecioPedidosYa();
    this.aplicarDescuento();
    console.log('DoCheck');
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
  get carrito() {
    return this.carritoService.getCarrito();
  }

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
      console.warn('No se puede guardar una venta sin productos.');
      return;
    }
    const montoDescuento = 0; //AL AGREGAR LÓGICA DE DESCUENTO A ARTÍCULO CAMBIAR ESTE VALOR

    const detalleVenta = carrito.map(item => ({
      id: 0, // Se asignará en el backend
      idVenta: 0, // Se asignará en el backend
      idArticulo: item.articulo.id, // Se obtiene desde el objeto Articulo dentro de ArticuloCarrito
      cantidad: item.cantidad,
      precioUnitario: item.articulo.precio, // Se obtiene desde el objeto Articulo
      montoDescuento: montoDescuento
    }));

    const venta: Venta = {
      id: 0,
      usuario: {
        iD_Usuario: 7,
        tipoUsuario: {
          id: this.idTipoUsuario,
          nombre: 'Administrador'
        },
        nombreUsuario: this.nombreUsuario,
        contrasenia: '1234',
        correoElectronico: 'admin@example.com',
        nombreCompleto: this.nombreCompleto,
        iD_Local: 1
      },
      fecha: new Date(),
      subtotal: this.subtotal(),
      total: this.totalConDescuento(),
      idMedioDePago: this.medioDePago ? this.medioDePago.id : 0,
      esPedidosYa: this.pedidoYa,
      local: {
        id: this.idLocal,
        nombre: 'Acassuso'
      },
      detalleVenta: [
        {
          id: 1,
          idVenta: 1,
          idArticulo: 1,
          cantidad: 2,
          precioUnitario: 50,
          precioVenta: 50
        }
      ]

    };

    this.ventaService.agregarVenta(venta).subscribe({
      next: (respuesta) => {
        console.log('Venta enviada con éxito', respuesta);
        this.cerrar();
        this.carritoService.vaciarCarrito();
      },
      error: (error) => {
        console.error('Error al enviar la venta', error);
      }
    });

    console.log('Venta cargada: ', venta);
  }



  aplicarPrecioPedidosYa(): void {
    if (this.pedidoYa) {
      this.subtotal.set(this.carritoService.getTotal() / 0.82);
    } else {
      this.subtotal.set(this.carritoService.getTotal());
    }
  }

  aplicarDescuento(): void {
    if (this.tipoDescuento === "porcentaje") {
      this.montoDescuento.set(this.subtotal() * this.numeroDescuento / 100);
    } else {
      this.montoDescuento.set(this.numeroDescuento);
    }
  }

  actualizarMedioDePago() {
    const medioSeleccionado = this.mediosDePago.find(m => m.id === this.medioDePago?.id);
    if (medioSeleccionado) {
      this.medioDePago = medioSeleccionado;
    }
  }
}
