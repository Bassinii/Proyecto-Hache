import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CarritoServiceService } from '../../../../core/services/carrito-service.service';
import { ArticuloCarrito } from '../../../../core/models/articulo-carrito';

@Component({
  selector: 'app-modal-carrito-item',
  templateUrl: './modal-carrito-item.component.html',
  styleUrl: './modal-carrito-item.component.css'
})
export class ModalCarritoItemComponent {
  @Input() articulo!: ArticuloCarrito;
  @Input() pedidoYa: boolean = false;


  @Output() actualizarData = new EventEmitter<void>();


  constructor(private carritoService: CarritoServiceService) { }

  aumentarCantidad() {
    this.carritoService.actualizarCantidad(this.articulo.articulo.id, this.articulo.cantidad + 1);
    this.actualizarData.emit();
  }

  disminuirCantidad() {
    if (this.articulo.cantidad > 1) {
      this.carritoService.actualizarCantidad(this.articulo.articulo.id, this.articulo.cantidad - 1);
    } else {
      this.eliminarItem();
    }
    this.actualizarData.emit();
  }

  eliminarItem() {
    this.carritoService.eliminarDelCarrito(this.articulo.articulo.id);
    this.actualizarData.emit();
  };

}
