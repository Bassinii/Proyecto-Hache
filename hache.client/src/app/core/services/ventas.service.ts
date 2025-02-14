import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta } from '../models/venta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
 
  private url: string = 'https://localhost:44369/api/Venta';

  constructor(private httpClient: HttpClient) { }

  public obtenerVentas(): Observable<Venta[]> {
    return this.httpClient.get<Venta[]>(this.url);
  }

}
