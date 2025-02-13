import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url : string = 'https://localhost:44369/api/Categoria'
  constructor(private httpCliente: HttpClient) { }

  public obtenerCategorias() : Observable<Categoria[]> {
    return this.httpCliente.get<Categoria[]>(this.url);
  }
}
