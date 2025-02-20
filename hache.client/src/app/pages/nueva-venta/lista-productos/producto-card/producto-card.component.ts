import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Articulo } from '../../../../core/models/articulo';
@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrl: './producto-card.component.css'
})
export class ProductoCardComponent {
  @Input() articulo!: Articulo; // Asegurar que se reciba el artículo completo
  @Output() agregarAlCarrito = new EventEmitter<Articulo>(); // Ahora emite un artículo

  onClick() {
    this.agregarAlCarrito.emit(this.articulo); // Enviar el artículo correcto
  }
}
