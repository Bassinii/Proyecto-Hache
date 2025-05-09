import { Data } from "@angular/router";

export interface TurnoCajaDto {
  idTurnoCaja: number;
  montoRetiro: number;
  montoCierre: number;
  fechaCierre: Date;
  observacion?: string;
}
