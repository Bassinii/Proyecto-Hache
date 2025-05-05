import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetallePedidoDTO } from '../DTOs/detalle-pedido.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {

  private url = 'https://localhost:44369/api/DetallePedido';
  constructor(private httpCliente: HttpClient) { }

  editarDetallePedido(idPedido: number, detalles: DetallePedidoDTO[]): Observable<any> {
    return this.httpCliente.put(`${this.url}/${idPedido}`, detalles);
  }

}
