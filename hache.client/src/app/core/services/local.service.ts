import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Local } from '../models/local';


@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private url: string = 'https://localhost:44369/api/Local'
  constructor(private httpCliente: HttpClient) { }

  public obtenerLocales(): Observable<Local[]> {
    return this.httpCliente.get<any[]>(this.url).pipe(
      map((locales) =>
        locales.map(local => ({
          id: local.iD_Local, 
          nombre: local.nombre
        }))
      )
    );
  }
}
