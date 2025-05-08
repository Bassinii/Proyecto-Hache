import { DetalleVentaDTO } from "./detalle-venta.dto";

export interface VentaDTO {
  iD_MedioDePago: number;
  iD_Usuario: number;
  fecha: Date;
  subtotal: number;
  total: number;
  esPedidosYa: boolean;
  iD_Local: number;
  detalleVenta: DetalleVentaDTO[];
  transaccionIdXubio?: number;
}
