import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url : string = 'https://localhost:44369/api/Categoria'
  constructor(private httpCliente: HttpClient) { }

  public obtenerCategorias(): Observable<Categoria[]> {
    return this.httpCliente.get<any[]>(this.url).pipe(
      map((categorias) =>
        categorias.map(categoria => ({
          id: categoria.iD_Categoria, // Mapeo de iD_Categoria a id
          nombre: categoria.nombre
        }))
      )
    );
  }
}
