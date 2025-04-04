import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticuloCarrito } from '../../../core/models/articulo-carrito';
import { CarritoServiceService } from '../../../core/services/carrito-service.service';


@Component({
  selector: 'app-item-carrito',
  templateUrl: './item-carrito.component.html',
  styleUrl: './item-carrito.component.css'
})
export class ItemCarritoComponent {
  @Input() articulo!: ArticuloCarrito;

  mostrarModal = false;


  abrirModalDescuento() {
    this.mostrarModal = true;
  }

 



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

  cerrarModal() {
    this.mostrarModal = false;
  }
}
