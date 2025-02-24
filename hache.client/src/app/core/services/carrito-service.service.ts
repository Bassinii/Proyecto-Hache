import { Injectable } from '@angular/core';
import { Articulo } from '../models/articulo';
import { ArticuloCarrito } from '../models/articulo-carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoServiceService {
  private carrito: ArticuloCarrito[] = [];

  public getCarrito() {
    return this.carrito;
  }

  public añadirAlCarrito(articuloAñadido: Articulo) {
    // Buscar si el artículo ya está en el carrito
    console.log(this.carrito);
    let articuloExistente = this.carrito.find(item => item.articulo.id === articuloAñadido.id);
    console.log('Despues de find: ',articuloExistente);
    if (articuloExistente) {
      // Si ya está en el carrito, aumentar la cantidad
      articuloExistente.cantidad++;
    } else {
      // Si no está en el carrito, agregarlo con cantidad 1
      this.carrito.push(new ArticuloCarrito(articuloAñadido, 1));
    }
    console.log('El despues del carrito: ', this.carrito);
  }

  public getTotal() {
    if (this.carrito.length == 0) {
      return 0;
    } else {
      return this.carrito.reduce((total, producto) => total + producto.articulo.precio * producto.cantidad, 0);
    }
  }
}
