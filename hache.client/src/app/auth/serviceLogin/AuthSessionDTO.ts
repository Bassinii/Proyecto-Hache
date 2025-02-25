export interface AuthSessionDTO {
  token: string;
  ID_Usuario: number;
  nombreUsuario: string;
  CorreoElectronico: string;
  nombreCompleto: string;
  iD_Local: number;
  tipoUsuario: {
  iD_TipoUsuario: number;
  nombre: string;
  }
}
