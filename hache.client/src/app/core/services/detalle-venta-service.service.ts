import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetalleVenta } from '../models/detalle-venta';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaServiceService {

  private url = 'https://localhost:44369/api/DetalleVenta';
  constructor(private httpCliente: HttpClient) { }

  getDetalleVentaPorIdVenta(idVenta: number): Observable<DetalleVenta[]> {
    return this.httpCliente.get<DetalleVenta[]>(`${this.url}/${idVenta}`);
  }

}
