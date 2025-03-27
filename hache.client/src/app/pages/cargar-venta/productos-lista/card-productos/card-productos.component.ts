import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Articulo } from '../../../../core/models/articulo';

@Component({
  selector: 'app-card-productos',
  templateUrl: './card-productos.component.html',
  styleUrl: './card-productos.component.css'
})
export class CardProductosComponent {
  @Input() articulo!: Articulo; // Asegurar que se reciba el artículo completo
  @Output() agregarAlCarrito = new EventEmitter<Articulo>(); // Ahora emite un artículo

  onClick() {
    this.agregarAlCarrito.emit(this.articulo); // Enviar el artículo correcto
  }
}
