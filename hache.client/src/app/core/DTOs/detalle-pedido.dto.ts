import { Imagen } from "../models/imagen";

export interface DetallePedidoDTO {
  iD_Pedido?: number
  iD_Articulo: number
  cantidad: number,
  precio_Unitario: number,
  imagen?: Imagen[],
  nombreArticulo?: string;
}
