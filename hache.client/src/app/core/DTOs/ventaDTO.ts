import { DetalleVenta } from "../models/detalle-venta";
import { Local } from "../models/local";
import { Usuario } from "../models/usuario";

export interface ventaDTO {
  iD_Venta: number;
  iD_MedioDePago: number;
  usuario: Usuario
  fecha: Date
  subtotal: number;
  total: number;
  esPedidosYa: boolean;
  iD_local: Local;
  detalleVenta: DetalleVenta[];
}
