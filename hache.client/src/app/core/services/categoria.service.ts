import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url: string = environment.apiUrl
  constructor(private httpCliente: HttpClient) { }

  public obtenerCategorias(): Observable<Categoria[]> {
    return this.httpCliente.get<any[]>(`${this.url}/Categoria`).pipe(
      map((categorias) =>
        categorias.map(categoria => ({
          id: categoria.iD_Categoria, // Mapeo de iD_Categoria a id
          nombre: categoria.nombre
        }))
      )
    );
  }

  public agregarCategoria(nombre: string): Observable<any> {
    return this.httpCliente.post(`${this.url}/Categoria`, { nombre });
  }

  bajaCategoria(id: number): Observable<any> {
    const endpoint = `${this.url}/Categoria/baja-categoria/${id}`;
    return this.httpCliente.patch(endpoint, null)
  }

  public obtenerCategoriasPorTipoPedido(idTipoPedido: number): Observable<Categoria[]> {

    const endpoint = `${this.url}/Categoria/ObtenerCategoriaPorTipoPedido?idTipoPedido=${idTipoPedido}`;

    // Realizamos la solicitud GET a la API
    return this.httpCliente.get<any[]>(endpoint).pipe(
      map((categorias) => {
        return categorias.map(categoria => ({
          id: categoria.iD_Categoria,  
          nombre: categoria.nombre     
        }));
      })
    );
  }


}
