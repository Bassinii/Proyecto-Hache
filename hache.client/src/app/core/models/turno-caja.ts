export interface TurnoCaja {

  iD_TurnoCaja?: number;
  iD_Usuario: number;
  iD_Local: number;
  fechaApertura: Date;
  montoApertura: number;
  fechaCierre?: Date;
  montoCierre?: number;
  montoRetiro?: number;
  abierta: boolean;
  observacion?: string;
}
