export interface DetalleVentaDTO {
  iD_Articulo: number,
  cantidad: number
  precio_Unitario: number,
  precio_Venta: number,
  codigoXubio?: string;
  nombre_Articulo?: string;
}
