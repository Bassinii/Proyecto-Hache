import { DetalleVenta } from "../models/detalle-venta";
import { Local } from "../models/local";
import { Usuario } from "../models/usuario";
import { DetalleVentaDTO } from "./detalle-ventaDTO";

export interface ventaDTO {
  iD_MedioDePago: number;
  iD_Usuario: number;
  fecha: Date;
  subtotal: number;
  total: number;
  esPedidosYa: boolean;
  iD_Local: number;
  detalleVenta: DetalleVentaDTO[];
}
