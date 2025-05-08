export interface TurnoCaja {

  iD_Caja?: number;
  iD_Usuario: number;
  iD_Local: number;
  fechaApertura: Date;
  montoApertura: number;
  fechaCierre?: Date;
  montoCierre?: number;
  montoRetiro?: number;
  abierta: boolean;

}
