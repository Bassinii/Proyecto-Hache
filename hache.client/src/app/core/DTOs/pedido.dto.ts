import { DetallePedidoDTO } from "./detalle-pedido.dto";

export interface PedidoDTO {
  iD_TipoPedido: number;
  iD_Local: Number;
  estado: string;
  fecha: Date;
  fechaEntrega: Date;
  detallePedido: DetallePedidoDTO;
}
