import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoPedido } from '../models/TipoPedido';

@Injectable({
  providedIn: 'root'
})
export class TipoPedidoService {

  private apiUrl = 'https://localhost:44369/api/TipoPedido'; 

  constructor(private http: HttpClient) { }

  obtenerTiposDePedido(): Observable<TipoPedido[]> {
    return this.http.get<TipoPedido[]>(this.apiUrl);
  }
}
