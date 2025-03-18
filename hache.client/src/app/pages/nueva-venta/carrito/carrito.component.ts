import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CarritoServiceService } from '../../../core/services/carrito-service.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {

  @Output() checkout = new EventEmitter<void>();
  abrirCheckout() {
    this.checkout.emit();
  }

  constructor(private servicio: CarritoServiceService) { }

  ngOnInit(): void { }

  get carrito() {
    return this.servicio.getCarrito();
  }

  get total() {
    return this.servicio.getTotal();
  }


}
