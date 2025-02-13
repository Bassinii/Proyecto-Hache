import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from '../models/articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloServiceService {

  private url = 'https://localhost:44369/api/Articulo';
  constructor(private httpCliente: HttpClient) { }

  public getArticulos() : Observable<Articulo[]> {
    return this.httpCliente.get<Articulo[]>(this.url);
  }

  actualizarArticulo(articulo: Articulo) {
    return this.httpCliente.put(`URL_DEL_BACKEND/articulos/${articulo.id}`, articulo); //MODIFICAR CUANDO SE CREE ESTE ENDPOINT
  }
}
