import { Articulo } from "./articulo";

export interface HistorialPrecios {
  id: number;
  articulo: Articulo
  precioAnterior: number;
  precioNuevo: number;
  fechaCambio: Date;
}
