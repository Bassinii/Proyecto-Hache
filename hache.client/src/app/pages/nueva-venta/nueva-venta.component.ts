import { Component, OnInit, signal, computed } from '@angular/core';
import { CarritoServiceService } from '../../core/services/carrito-service.service';
import { Venta } from '../../core/models/venta';
import { VentasService } from '../../core/services/ventas.service';
import { MedioDePagoService } from '../../core/services/medio-de-pago.service';
import { MedioDePago } from '../../core/models/medio-de-pago';

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrl: './nueva-venta.component.css'
})
export class NuevaVentaComponent implements OnInit {

  mostrarModal: boolean = false;
  pedidoYa: boolean = false;
  descuento: number = 0; //puede ser un numero porcentual o un monto fijo
  montoDescuento: number = 0;
  medioDePago: MedioDePago = {id: 1, nombre: 'Efectivo'}

  mediosDePago: MedioDePago[] = [];
  metodoSeleccionado: string = '';
  totalVenta = signal(0);
  tipoDescuento: string = 'porcentaje';
  totalConDescuento = 0;

  venta: Venta = {
    id: 0,
    usuario: {
      id: 1,
      tipoUsuario: {
        id: 1,
        nombre: 'Administrador'
      },
      nombreUsuario: 'admin',
      contrasenia: '1234',
      correoElectronico: 'admin@example.com',
      nombreCompleto: 'Admin User',
      idLocal: 1
    },
    fecha: new Date(),
    subtotal: 100,
    total: 110,
    idMedioDePago: 1,
    esPedidosYa: false,
    local: {
      id: 1,
      nombre: 'Hache Gluten Free'
    },
    detalleVenta: [
      {
        id: 0,
        idVenta: 0,
        idArticulo: 1,
        cantidad: 2,
        precioUnitario: 50,
        porcentajeDescuento: 0
      }
    ]
  };

  constructor(
    private carritoService: CarritoServiceService,
    private ventaService: VentasService,
    private medioDePagoService: MedioDePagoService
  ) {
  }

  ngOnInit() {
    this.cargarMediosDePago();
  }


  get carrito() {
    return this.carritoService.getCarrito();
  }

  get totalCarrito() {
    return this.carritoService.getTotal();
  }

  actualizarTotalCarrito() {
    this.totalVenta.set(this.carritoService.getTotal());
  }


  calcularTotal() {
    const precioBase = 1000; // Lógica real aquí
    return precioBase - (precioBase * (this.descuento / 100));
  }

  abrirModal() {
    this.actualizarTotalCarrito();
    this.totalConDescuento = this.totalVenta();
    this.totalConDescuento = this.totalConDescuento - this.montoDescuento;
    this.aplicarDescuento();
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  confirmarCompra() {
    console.log('Compra confirmada con:', this.medioDePago, this.pedidoYa, this.descuento);
  }

  aplicarDescuento(): void {
    const totalActual = this.totalVenta();  // Obtener el total actualizado
    console.log(totalActual);
    console.log(this.tipoDescuento);
    if (this.tipoDescuento === "porcentaje") {
      this.montoDescuento = totalActual * this.descuento / 100;
    } else {
      this.montoDescuento = this.descuento;
    }

    this.totalConDescuento = totalActual - this.montoDescuento;

    //if (this.totalConDescuento() < 0) {
    //  this.totalVenta.set(0); // Evitar negativos
    //}
  }

  guardarVenta(): void {
    this.ventaService.agregarVenta(this.venta).subscribe({
      next: (respuesta) => {
        console.log('Venta enviada con éxito', respuesta);
      },
      error: (error) => {
        console.error('Error al enviar la venta', error);
      }
    });
  }

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

}
