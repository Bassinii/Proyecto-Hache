import { Component } from '@angular/core';
import { CarritoServiceService } from '../../../core/services/carrito-service.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products = [
    { id: 1, name: 'Brownie', price: 3990, image: 'path_to_brownie_image.jpg' },
    { id: 2, name: 'Lemonie', price: 2850, image: 'path_to_lemonie_image.jpg' },
    // Resto de los productos...
  ];

  constructor(private carritoService: CarritoServiceService) { }

  addToCart(articulo: any) {
    this.carritoService.añadirAlCarrito(articulo);
  }
}
