import { DetalleVenta } from "./detalle-venta";
import { Local } from "./local";
import { Usuario } from "./usuario";

export interface Venta {
  id: number;
  usuario: Usuario
  fecha: Date
  subtotal: number;
  total: number;
  esPedidosYa: boolean;
  local: Local;
  detalleVenta: DetalleVenta;

}