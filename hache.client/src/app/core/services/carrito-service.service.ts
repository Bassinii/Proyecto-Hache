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
    this.carrito.push(new ArticuloCarrito(articuloAñadido, 1));

  }



  public getTotal() {
    return this.carrito.reduce((total, producto) => total + producto.articulo.precio * producto.cantidad, 0);
  }


}
