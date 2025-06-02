import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetalleVenta } from '../models/detalle-venta';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DetalleVentaServiceService {

  private url: string = environment.apiUrl
  constructor(private httpCliente: HttpClient) { }

  getDetalleVentaPorIdVenta(idVenta: number): Observable<DetalleVenta[]> {
    return this.httpCliente.get<DetalleVenta[]>(`${this.url}/DetalleVenta/${idVenta}`);
  }

}
