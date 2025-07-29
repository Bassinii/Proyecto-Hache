import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoPedido } from '../models/TipoPedido';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoPedidoService {

  private url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  obtenerTiposDePedido(): Observable<TipoPedido[]> {
    return this.http.get<TipoPedido[]>(`${this.url}/TipoPedido`);
  }

  obtenerTipoPedidoPorId(id: number) {
    return this.http.get<TipoPedido>(`${this.url}/TipoPedido/id/${id}`);
  }
}
