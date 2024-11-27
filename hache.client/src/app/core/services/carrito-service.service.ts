import { Injectable } from '@angular/core';
import { Articulo } from '../models/articulo';
import { ArticuloCarrito } from '../models/articulo-carrito';


@Injectable({
  providedIn: 'root'
})
export class CarritoServiceService {

  private carrito : ArticuloCarrito[] = [];

  constructor() { }

  public getCarrito() {
    return this.carrito;
  }

  public añadirAlCarrito(articuloAñadido: Articulo) {
    const existeArticulo = this.carrito.find((articulo) => articulo.id === articuloAñadido.id);
    if (existeArticulo) {
      //Subir cantidad del articulo en el carrito. Falta clase ArticuloCarrito que tenga de atributo la cantidad de articulos llevados.
    }
    else {
      this.carrito.push(articuloAñadido);
    }
  }

  getTotal() {
    return this.carrito.reduce((total, producto) => total + producto.articulo.precio * producto.cantidad, 0);
  }


}
