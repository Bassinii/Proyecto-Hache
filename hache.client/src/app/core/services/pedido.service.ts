import { Injectable } from '@angular/core';
import { PedidoDTO } from '../DTOs/pedido.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { editarPedidoDTO } from '../DTOs/editarPedido.dto';

@Injectable({
  providedIn: 'root'
})

export class PedidoService {

  private url: string = 'https://localhost:44369/api/Pedido';
  constructor(private httpCliente: HttpClient) { }

  agregarPedido(pedido: PedidoDTO): Observable<any> {
    return this.httpCliente.post(this.url, pedido);
  }

  obtenerPedidos(): Observable<PedidoDTO[]> {
    return this.httpCliente.get<PedidoDTO[]>(this.url);
  }

  editarPedido(idPedido: number, datos: editarPedidoDTO): Observable<any> {

    return this.httpCliente.patch(`${this.url}/${idPedido}`, datos);
  }

   BajaArticulo(idArticulo: number): Observable<any> {
    return this.httpCliente.patch(`${this.url}/baja-Articulo/${idArticulo}`, {});
  }


}
