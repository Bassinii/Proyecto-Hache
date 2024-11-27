import { Articulo } from "./articulo";

export interface ArticuloCarrito {
  articulo: Articulo;
  cantidad: number;
}

export class ArticuloCarrito implements ArticuloCarrito {
  articulo?: Articulo
  cantidad?: number;

  public ArticuloCarrito(articulo: Articulo, cantidad:number) {
    this.articulo = articulo;
    this.cantidad = cantidad;
  }
}
