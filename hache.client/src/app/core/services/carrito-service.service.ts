import { Injectable } from '@angular/core';
import { Articulo } from '../models/articulo';
import { ArticuloCarrito } from '../models/articulo-carrito';


@Injectable({
  providedIn: 'root'
})
export class CarritoServiceService {

  private carrito : ArticuloCarrito[] = [];


  public getCarrito() {
    return this.carrito;
  }

  public añadirAlCarrito(articuloAñadido: Articulo) {
    //Falta logica para solo sumar en cantidad si ya existe el articulo en el carrito
    this.carrito.push(new ArticuloCarrito(articuloAñadido,1));
  }

  getTotal() {
    return this.carrito.reduce((total, producto) => total + producto.articulo.precio * producto.cantidad, 0);
  }


}
