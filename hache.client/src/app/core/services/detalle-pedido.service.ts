import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetallePedidoDTO } from '../DTOs/detalle-pedido.dto';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {

  private url: string = environment.apiUrl
  constructor(private httpCliente: HttpClient) { }

  editarDetallePedido(idPedido: number, detalles: DetallePedidoDTO[]): Observable<any> {
    return this.httpCliente.put(`${this.url}/DetallePedido/${idPedido}`, detalles);
  }

}
