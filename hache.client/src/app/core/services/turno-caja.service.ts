import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TurnoCaja } from '../models/turno-caja';
import { Observable } from 'rxjs';
import { TurnoCajaDto } from '../DTOs/turno-caja.dto';

@Injectable({
  providedIn: 'root'
})
export class TurnoCajaService {

  private url: string = 'https://localhost:44369/api/TurnoCaja';

  constructor(private http: HttpClient) { }

  abrirCaja(turnoCaja: TurnoCaja): Observable<any> {
    return this.http.post(`${this.url}/abrir`, turnoCaja);
  }

  cerrarCaja(dto: TurnoCajaDto): Observable<any> {
    return this.http.post(`${this.url}/cerrar`, dto);
  }

  obtenerTurnoCajaPorId(idTurno: number): Observable<any> {
    return this.http.get(`${this.url}/abierta/${idTurno}`);
  }
}
