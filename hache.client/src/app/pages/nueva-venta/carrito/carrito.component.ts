import { Component } from '@angular/core';
import { CarritoServiceService } from '../../../core/services/carrito-service.service';


@Component({
  selector: 'app-cart',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CartComponent {
  constructor(private carritoService: CarritoServiceService) {}

  get cart() {
    return this.carritoService.getCarrito();
  }

  get total() {
    return this.carritoService.getTotal();
  }
}
