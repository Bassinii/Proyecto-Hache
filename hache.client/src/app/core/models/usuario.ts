import { TipoUsuario } from "./tipo-usuario";

export interface Usuario {
  id: number;
  nombreUsuario: string;
  contrasenia: string;
  correoElectronico: string;
  nombreCompleto: string;
  idLocal: number;
  tipoUsuario: TipoUsuario;
}
