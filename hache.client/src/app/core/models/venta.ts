import { DetalleVenta } from "./detalle-venta";
import { Local } from "./local";
import { Usuario } from "./usuario";

export interface Venta {
  id: number;
  idMedioDePago: number;
  idUsuario: number;
  fecha: Date;
  subtotal: number;
  total: number;
  esPedidosYa: boolean;
  local: Local;
  detalleVenta: DetalleVenta[];
  nombreMedioPago?: string;

}
