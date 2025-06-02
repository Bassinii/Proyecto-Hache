import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Local } from '../models/local';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private url: string = environment.apiUrl;
  constructor(private httpCliente: HttpClient) { }

  public obtenerLocales(): Observable<Local[]> {
    return this.httpCliente.get<any[]>(`${this.url}/Local`).pipe(
      map((locales) =>
        locales.map(local => ({
          id: local.iD_Local,
          nombre: local.nombre
        }))
      )
    );
  }

  public obtenerLocalPorId(id: number): Observable<Local> {
    const endpoint = `${this.url}/Local/${id}`;
    return this.httpCliente.get<any>(endpoint).pipe(
      map(local => ({
        id: local.iD_Local,
        nombre: local.nombre
      }))
    );
  }


  public agregarlocal(nombre: string): Observable<Local> {
    const nuevoLocal = { nombre };
    return this.httpCliente.post<Local>(`${this.url}/Local`, nuevoLocal);
  }

  public bajaLocal(idLocal: number): Observable<any> {
    const endpoint = `${this.url}/Local/BajaLocal?idLocal=${idLocal}`;
    return this.httpCliente.patch(endpoint, null);
  }

}
