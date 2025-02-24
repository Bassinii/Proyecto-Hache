import { Component, OnInit, signal, computed } from '@angular/core';
import { CarritoServiceService } from '../../core/services/carrito-service.service';

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrl: './nueva-venta.component.css'
})
export class NuevaVentaComponent implements OnInit {

  mostrarModal: boolean = false;
  metodoPago: string = 'efectivo';
  pedidoYa: boolean = false;
  descuento: number = 0; //puede ser un numero porcentual o un monto fijo
  montoDescuento: number = 0;

  metodosPago: any[] = [];
  metodoSeleccionado: string = '';
  totalVenta = signal(0);
  tipoDescuento: string = 'porcentaje';
  totalConDescuento = 0;


  constructor(private carritoService: CarritoServiceService) {
  }

  ngOnInit() {

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
    console.log('Compra confirmada con:', this.metodoPago, this.pedidoYa, this.descuento);
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

}
