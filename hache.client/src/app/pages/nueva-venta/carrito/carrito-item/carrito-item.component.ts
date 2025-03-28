import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CarritoServiceService } from '../../../../core/services/carrito-service.service';
import { ArticuloCarrito } from '../../../../core/models/articulo-carrito';



@Component({
  selector: 'app-carrito-item',
  templateUrl: './carrito-item.component.html',
  styleUrl: './carrito-item.component.css'
})
export class CarritoItemComponent {
  @Input() articulo!: ArticuloCarrito;


  constructor(private carritoService: CarritoServiceService) { }

  aumentarCantidad() {
    this.carritoService.actualizarCantidad(this.articulo.articulo.id, this.articulo.cantidad + 1);
  }

  disminuirCantidad() {
    if (this.articulo.cantidad > 1) {
      this.carritoService.actualizarCantidad(this.articulo.articulo.id, this.articulo.cantidad - 1);
    } else {
      this.eliminarItem();
    }
  }

  eliminarItem() {
    this.carritoService.eliminarDelCarrito(this.articulo.articulo.id);
  };
}
