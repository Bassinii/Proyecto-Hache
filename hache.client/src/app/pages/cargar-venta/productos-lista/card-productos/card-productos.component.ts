import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Articulo } from '../../../../core/models/articulo';

@Component({
  selector: 'app-card-productos',
  templateUrl: './card-productos.component.html',
  styleUrl: './card-productos.component.css'
})
export class CardProductosComponent implements OnInit {
  @Input() articulo!: Articulo; // Asegurar que se reciba el artículo completo
  @Output() agregarAlCarrito = new EventEmitter<Articulo>(); // Ahora emite un artículo

  onClick() {
    this.agregarAlCarrito.emit(this.articulo); // Enviar el artículo correcto
  }

  ngOnInit() {
    //if (this.articulo.imagen[0].url == null || this.articulo.imagen[0].url == undefined) {
    //  this.articulo.imagen[0].url = "assets/images/articles/noimage.png";
    //}
  }

}
