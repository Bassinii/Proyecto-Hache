import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { AgregarUsuarioDTO } from '../DTOs/agregarUsuario.dto';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  private url: string = environment.apiUrl
  constructor(private httpCliente: HttpClient) { }

    public getUsuarios(): Observable<Usuario[]> {
      return this.httpCliente.get<Usuario[]>(`${this.url}/Usuario`).pipe(
      map((usuarios) =>
        usuarios.map(usuario => ({
          iD_Usuario: usuario.iD_Usuario,
          tipoUsuario: usuario.tipoUsuario,
          nombreUsuario: usuario.nombreUsuario ?? "-", 
          correoElectronico: usuario.correoElectronico ?? "-", 
          nombreCompleto: usuario.nombreCompleto ?? "-", 
          iD_Local: usuario.iD_Local ?? 0
        }))
      )
    );
    }

  actualizarUsuario(usuario: Usuario): Observable<any> {
    return this.httpCliente.put(`${this.url}/Usuario/ModificarUsuario`, usuario);

  }
  
  BajaUsuario(idUsuario: number): Observable<any> {
    return this.httpCliente.patch(`${this.url}/Usuario/baja-usuario/${idUsuario}`, {});
  }

  agregarUsuario(nuevoUsuario: AgregarUsuarioDTO): Observable<AgregarUsuarioDTO> {
    return this.httpCliente.post<AgregarUsuarioDTO>(`${this.url}/Usuario`, nuevoUsuario);
  }

}
