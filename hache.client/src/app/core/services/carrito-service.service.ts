import { Injectable } from '@angular/core';
import { Articulo } from '../models/articulo';


@Injectable({
  providedIn: 'root'
})
export class CarritoServiceService {

  private carrito : Articulo[] = [];

  constructor() { }

  public añadirAlCarrito(articuloAñadido: Articulo) {
    const existeArticulo = this.carrito.find((articulo) => articulo.id === articuloAñadido.id);
    if (existeArticulo) {
      //Subir cantidad del articulo en el carrito. Falta clase ArticuloCarrito que tenga de atributo la cantidad de articulos llevados.
    }
    else {
      this.carrito.push(articuloAñadido);
    }
  }


}
