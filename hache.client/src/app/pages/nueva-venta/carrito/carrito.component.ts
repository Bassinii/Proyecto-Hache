//import { Component, OnInit } from '@angular/core';
//import { CarritoServiceService } from '../../../core/services/carrito-service.service';
//import { FormsModule } from '@angular/forms';

//@Component({
//  selector: 'app-carrito',
//  templateUrl: './carrito.component.html',
//  styleUrls: ['./carrito.component.css']
//})
//export class CarritoComponent implements OnInit {

//  // Propiedad para manejar el estado del modal
//  mostrarModal: boolean = false;
//  metodoPago: string = 'efectivo';
//  pedidoYa: boolean = false;
//  descuento: number = 0;

//  constructor(private servicio: CarritoServiceService) { }

//  ngOnInit(): void { }

//  // Obtiene los artículos del carrito
//  get carrito() {
//    return this.servicio.getCarrito();
//  }

//  // Calcula el total
//  get total() {
//    return this.servicio.getTotal();
//  }

//  // Método para calcular el total con descuento
//  calcularTotal() {
//    const precioBase = this.total; // Usa el total del carrito como base
//    return precioBase - (precioBase * (this.descuento / 100));
//  }

//  // Cierra el modal
//  cerrarModal() {
//    this.mostrarModal = false;
//  }

//  // Simula la confirmación de compra
//  confirmarCompra() {
//    console.log('Compra confirmada con:', this.metodoPago, this.pedidoYa, this.descuento);
//    this.cerrarModal(); // Cierra el modal después de la compra
//  }
//}

import { Component, Input, OnInit } from '@angular/core';
import { CarritoServiceService } from '../../../core/services/carrito-service.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {

  @Input() abrirModal!: () => void; // Recibe la función desde `NuevaVentaComponent`

  constructor(private servicio: CarritoServiceService) { }

  ngOnInit(): void { }

  get carrito() {
    return this.servicio.getCarrito();
  }

  get total() {
    return this.servicio.getTotal();
  }
}
