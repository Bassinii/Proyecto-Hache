import { TipoUsuario } from "./tipo-usuario";

export interface Usuario {
  iD_Usuario: number;
  nombreUsuario: string;
  contrasenia?: string;
  correoElectronico: string;
  nombreCompleto: string;
  iD_Local: number;
  tipoUsuario: TipoUsuario;
  nombreLocal?: string;

}
