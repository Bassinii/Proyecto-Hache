import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CarritoServiceService } from '../../core/services/carrito-service.service';


@Component({
  selector: 'app-cargar-venta',
  templateUrl: './cargar-venta.component.html',
  styleUrl: './cargar-venta.component.css'
})
export class CargarVentaComponent {

  @Output() checkout = new EventEmitter<void>();

  mostrarModal = false;

  constructor(private servicio: CarritoServiceService) { }

  ngOnInit(): void { }

  get carrito() {
    return this.servicio.getCarrito();
  }

  get total() {
    return this.servicio.getTotal();
  }


  abrirCheckout() {
    this.mostrarModal = true
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

}
