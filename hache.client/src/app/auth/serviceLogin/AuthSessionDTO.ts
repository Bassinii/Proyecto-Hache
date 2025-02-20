export interface AuthSessionDTO {
  token: string;
  ID_Usuario: number;
  NombreUsuario: string;
  CorreoElectronico: string;
  NombreCompleto: string;
  ID_Local: number;
  tipoUsuario: {
    iD_TipoUsuario: number;
    nombre: string;
  }
}
