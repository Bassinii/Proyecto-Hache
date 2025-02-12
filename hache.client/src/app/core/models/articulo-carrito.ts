import { Articulo } from "./articulo";

export interface iArticuloCarrito {
  articulo: Articulo;
  cantidad: number;
}

export class ArticuloCarrito implements iArticuloCarrito {
  articulo: Articulo;
  cantidad: number;

  constructor(articulo: Articulo, cantidad: number = 1) {
    this.articulo = articulo;
    this.cantidad = cantidad;
  } 
}
