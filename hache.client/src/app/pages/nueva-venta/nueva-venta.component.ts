import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() { }

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
}
