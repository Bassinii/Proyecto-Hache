import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MedioDePago } from '../models/medio-de-pago';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedioDePagoService {

  private url: string = environment.apiUrl

  constructor(private httpCliente: HttpClient) { }

  public obtenerMediosDePago(): Observable<MedioDePago[]> {
    return this.httpCliente.get<any[]>(`${this.url}/MedioDePago`).pipe(
      map((mediosDePago) =>
        mediosDePago.map(medioDePago => ({
          id: medioDePago.iD_MedioDePago,
          nombre: medioDePago.nombre
        }))
      )
    );

  }

  public obtenerTodosLosMediosDePagoEInactivos(): Observable<MedioDePago[]> {
    const URL = `${this.url}/MedioDePago/TodosLosMediosDePagoEInactivos`;
    return this.httpCliente.get<any[]>(URL).pipe(
      map((mediosDePago) =>
        mediosDePago.map(medioDePago => ({
          id: medioDePago.iD_MedioDePago,
          nombre: medioDePago.nombre
        }))
      )
    );
  }

  public obtenerMedioDePagoPorId(id: number): Observable<MedioDePago> {
    const endpoint = `${this.url}/MedioDePago/${id}`;
    return this.httpCliente.get<any>(endpoint).pipe(
      map(medioDePago => ({
        id: medioDePago.iD_MedioDePago,
        nombre: medioDePago.nombre
      }))
    );
  }

  public agregarMedioDePago(nombre: string): Observable<MedioDePago> {
    const nuevoMedioDePago = { nombre };
    return this.httpCliente.post<MedioDePago>(`${this.url}/MedioDePago`, nuevoMedioDePago);
  }

  public bajaMedioDePago(idMedioDePago: number): Observable<any> {
    return this.httpCliente.patch(`${this.url}/MedioDePago/baja-medioDePago/${idMedioDePago}`, {});
  }


}
