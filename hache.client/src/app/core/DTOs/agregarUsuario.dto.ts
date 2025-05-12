import { TipoUsuario } from "../models/tipo-usuario";

export interface AgregarUsuarioDTO {
  NombreUsuario: string;
  Contrasenia: string;
  CorreoElectronico: string;
  NombreCompleto: string;
  ID_Local: number;
  TipoUsuario: {
    ID_TipoUsuario: number;
  };
}
