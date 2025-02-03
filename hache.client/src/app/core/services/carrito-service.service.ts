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
    const index = this.carrito.findIndex(item => item.articulo.id == articuloAñadido.id);
    console.log(index)
    if (index == -1) {
      let item = new ArticuloCarrito(articuloAñadido, 1);
      this.carrito.push(item);
    } else {
      this.actualizar(index, this.carrito[index].cantidad + 1);
    }

    console.log(this.carrito);
  }

  actualizar(index : number, cantidad: number) {
    if (index >= 0 && index < this.carrito.length) {
      this.carrito[index].cantidad = cantidad;
    }
  }

  getTotal() {
    return this.carrito.reduce((total, producto) => total + producto.articulo.precio * producto.cantidad, 0);
  }


}
