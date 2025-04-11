import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Articulo } from '../../../../core/models/articulo';
import { ArticuloCarrito } from '../../../../core/models/articulo-carrito';

@Component({
  selector: 'app-modal-aplicar-descuento',
  templateUrl: './modal-aplicar-descuento.component.html',
  styleUrl: './modal-aplicar-descuento.component.css'
})
export class ModalAplicarDescuentoComponent {
  @Input() articulo!: ArticuloCarrito;
  @Output() cerrarModal = new EventEmitter<void>(); // Notifica cuando se cierra el modal

  mostrarModal = true;

  tipoDescuento: string = 'porcentaje';
  valorDescuento: number = 0;

  cerrar() {
    this.cerrarModal.emit();
    this.mostrarModal = false;
  }

  calcularDescuento(): number {
    let precioOriginal = this.articulo.articulo.precio;
    if (this.tipoDescuento === 'porcentaje') {
      return ((precioOriginal * this.articulo.cantidad) * (this.valorDescuento / 100));
    } else {
      return this.valorDescuento;
    }
  }

  aplicarDescuento() {
    this.articulo.montoDescuento = this.calcularDescuento();
    this.cerrar();
   }
}
