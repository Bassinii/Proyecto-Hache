import { Injectable } from '@angular/core';
import { PedidoDTO } from '../DTOs/pedido.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private url: string = 'https://localhost:44369/api/Pedido';
  constructor(private httpCliente: HttpClient) { }

  agregarPedido(pedido: PedidoDTO): Observable<any> {
    return this.httpCliente.post(this.url + '/AgregarPedido', pedido);
  }



}
