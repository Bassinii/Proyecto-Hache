import { Component, OnInit } from '@angular/core';
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
  descuento: number = 0;

  metodosPago: any[] = [];
  metodoSeleccionado: string = '';
  totalVenta: number = 0; // Total base de ejemplo
  tipoDescuento: string = 'porcentaje';
  totalConDescuento: number = this.totalVenta;
  constructor(private carritoService: CarritoServiceService) {
    this.totalVenta = this.totalCarrito;
  }

  ngOnInit() {
    this.totalVenta = this.totalCarrito;
    this.totalConDescuento = this.totalVenta; // Inicializar el total con descuento también
  }


  get carrito() {
    return this.carritoService.getCarrito();
  }

  get totalCarrito() {
    return this.carritoService.getTotal();
  }

  calcularTotal() {
    const precioBase = 1000; // Lógica real aquí
    return precioBase - (precioBase * (this.descuento / 100));
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  confirmarCompra() {
    console.log('Compra confirmada con:', this.metodoPago, this.pedidoYa, this.descuento);
  }

  aplicarDescuento(): void {
    if (this.tipoDescuento === 'porcentaje') {
      this.totalConDescuento = this.totalVenta - (this.totalVenta * this.descuento) / 100;
    } else {
      this.totalConDescuento = this.totalVenta - this.descuento;
    }

    if (this.totalConDescuento < 0) {
      this.totalConDescuento = 0; // Evitar que el total sea negativo
    }
  }
}
