import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { CarritoServiceService } from '../../../core/services/carrito-service.service';
import { VentasService } from '../../../core/services/ventas.service';
import { MedioDePagoService } from '../../../core/services/medio-de-pago.service';
import { MedioDePago } from '../../../core/models/medio-de-pago';
import { Venta } from '../../../core/models/venta';

@Component({
  selector: 'app-modal-checkout',
  templateUrl: './modal-checkout.component.html',
  styleUrl: './modal-checkout.component.css'
})
export class ModalCheckoutComponent implements OnInit{
  @Output() cerrarModal = new EventEmitter<void>(); // Notifica cuando se cierra el modal

  mostrarModal = true;

  mediosDePago: MedioDePago[] = []; //Se cargan de la DB los medios de pago existenes
  medioDePago: MedioDePago = { id: 1, nombre: 'Efectivo' } //Se asigna el medio de pago de la venta

  pedidoYa: boolean = false; //true o false si la venta se realiza en PedidosYa

  metodoSeleccionado: string = '';
  subtotal = signal(0);

  tipoDescuento: string = 'porcentaje';
  totalConDescuento = 0;
  descuento = signal(0); //puede ser un numero porcentual o un monto fijo
  montoDescuento = 0;

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
    this.cargarDatosUsuario();
    this.cargarMediosDePago();
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
      total: this.totalConDescuento,
      idMedioDePago: this.medioDePago.id,
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
          porcentajeDescuento: 0
        }
      ]
    };
    this.ventaService.agregarVenta(venta).subscribe({
      next: (respuesta) => {
        console.log('Venta enviada con éxito', respuesta);
        this.cerrar();
        this.carritoService.vaciarCarrito();

        //QUEDA SIN FUNCION EL TOAST DE EXITO.
        // ✅ Mostrar el toast de éxito
        //this.mostrarToast = true;

        //// ⏳ Ocultar el toast después de 3 segundos
        //setTimeout(() => {
        //  this.mostrarToast = false;
        //}, 4000);

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

    this.totalConDescuento = this.subtotal();
    this.aplicarDescuento();
  }

  aplicarDescuento(): void {
    const totalActual = this.subtotal();  // Obtener el subtotal actualizado
    console.log(totalActual);
    console.log(this.tipoDescuento);
    if (this.tipoDescuento === "porcentaje") {
      this.montoDescuento = totalActual * this.descuento() / 100;
    } else {
      this.montoDescuento = this.descuento();
    }

    this.totalConDescuento = totalActual - this.montoDescuento;

    //if (this.totalConDescuento() < 0) {
    //  this.totalVenta.set(0); // Evitar negativos
    //}
  }
}
