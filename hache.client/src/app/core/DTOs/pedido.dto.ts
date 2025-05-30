import { DetallePedidoDTO } from "./detalle-pedido.dto";

export interface PedidoDTO {
  iD_Pedido?: number;
  iD_TipoPedido: number;
  iD_Local: Number;
  estado: string;
  fecha: string;
  observacion?: string; 
  fechaEntrega?: string;
  detallePedido: DetallePedidoDTO[],
}
