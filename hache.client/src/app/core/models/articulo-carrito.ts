import { Articulo } from "./articulo";

export interface iArticuloCarrito {
  articulo: Articulo;
  cantidad: number;
  montoDescuento: number;
}

export class ArticuloCarrito implements iArticuloCarrito {
  articulo: Articulo;
  cantidad: number;
  montoDescuento: number;

  constructor(articulo: Articulo, cantidad: number, descuento: number) {
    this.articulo = articulo;
    this.cantidad = cantidad;
    this.montoDescuento = descuento;
  } 
}
