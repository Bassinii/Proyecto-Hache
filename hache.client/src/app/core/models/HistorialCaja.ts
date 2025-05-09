

export interface HistorialCaja{
  iD_HistorialCaja?: number;
  iD_TurnoCaja: number;
  iD_Usuario: number;
  iD_Local: number;
  tipoMovimiento: string;
  monto: number;
  fecha: Date;
  nombreUsuario?: string;
  observacion?: string;
}
