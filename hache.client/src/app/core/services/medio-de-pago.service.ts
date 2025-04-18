import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MedioDePago } from '../models/medio-de-pago';

@Injectable({
  providedIn: 'root'
})
export class MedioDePagoService {

  private url: string = 'https://localhost:44369/api/MedioDePago'
  constructor(private httpCliente: HttpClient) { }

  public obtenerMediosDePago(): Observable<MedioDePago[]> {
    return this.httpCliente.get<any[]>(this.url).pipe(
      map((mediosDePago) =>
        mediosDePago.map(medioDePago => ({
          id : medioDePago.iD_MedioDePago,
          nombre : medioDePago.nombre
        }))
      )
    );
  }
}
