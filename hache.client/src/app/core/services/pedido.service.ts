import { Injectable } from '@angular/core';
import { PedidoDTO } from '../DTOs/pedido.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { editarPedidoDTO } from '../DTOs/editarPedido.dto';
import { observacionUpdateDTO } from '../DTOs/observacionUpdate.dto';
import { Pedido } from '../models/pedido';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PedidoService {

  private url: string = environment.apiUrl;
  constructor(private httpCliente: HttpClient) { }

  agregarPedido(pedido: PedidoDTO): Observable<any> {
    return this.httpCliente.post(`${this.url}/Pedido`, pedido);
  }

  obtenerPedidos(): Observable<PedidoDTO[]> {
    return this.httpCliente.get<PedidoDTO[]>(`${this.url}/Pedido`);
  }

  editarPedido(idPedido: number, datos: editarPedidoDTO): Observable<any> {

    return this.httpCliente.patch(`${this.url}/Pedido/${idPedido}`, datos);
  }

   BajaArticulo(idArticulo: number): Observable<any> {
     return this.httpCliente.patch(`${this.url}/Pedido/baja-Articulo/${idArticulo}`, {});
  }

  obtenerObservacion(idPedido: number): Observable<string> {
    return this.httpCliente.get(`${this.url}/Pedido/observacion/${idPedido}`, { responseType: 'text' });
  }
  editarObservacion(dto: observacionUpdateDTO): Observable<any> {
    return this.httpCliente.patch(`${this.url}/Pedido/editarObservacion`, dto);
  }

  obtenerPedidoPorID(idPedido: number): Observable<PedidoDTO> {
    return this.httpCliente.get<PedidoDTO>(`${this.url}/Pedido/id/${idPedido}`);
  }
}
