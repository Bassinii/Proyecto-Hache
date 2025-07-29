import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticuloCarrito } from '../../../../core/models/articulo-carrito';
import { CarritoServiceService } from '../../../../core/services/carrito-service.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-checkout-item',
  templateUrl: './checkout-item.component.html',
  styleUrl: './checkout-item.component.css'
})
export class CheckoutItemComponent {
  @Input() articulo!: ArticuloCarrito;
  @Input() pedidoYa: boolean = false;

  @Output() actualizarData = new EventEmitter<void>();

  private url: string = environment.apiUrl;

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
