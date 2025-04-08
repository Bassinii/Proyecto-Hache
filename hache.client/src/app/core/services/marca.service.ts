import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marca } from '../models/marca';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private url: string = 'https://localhost:44369/api/Marca';
  constructor(private httpCliente: HttpClient
  ) { }

  public obtenerMarcas(): Observable<Marca[]> {
    return this.httpCliente.get<any[]>(this.url).pipe(
      map((marcas) =>
        marcas.map(marca => ({
          id: marca.iD_Marca, // Mapeo de iD_Marca a id
          nombre: marca.nombre
        }))
      )
    );
  }

  public agregarMarca(nombre: string): Observable<Marca> {
    const nuevaMarca = { nombre }; // Solo enviamos el nombre
    return this.httpCliente.post<Marca>(this.url, nuevaMarca);
  }

  public bajaMarca(idMarca: number): Observable<any> {
    return this.httpCliente.patch(`${this.url}?idMarca=${idMarca}`, {});
  }

}
