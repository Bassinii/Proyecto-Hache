import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TurnoCaja } from '../models/turno-caja';
import { Observable } from 'rxjs';
import { TurnoCajaDto } from '../DTOs/turno-caja.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TurnoCajaService {

  private url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  abrirCaja(turnoCaja: TurnoCaja): Observable<any> {
    return this.http.post(`${this.url}/TurnoCaja/abrir`, turnoCaja);
  }

  cerrarCaja(dto: TurnoCajaDto): Observable<any> {
    return this.http.post(`${this.url}/TurnoCaja/cerrar`, dto);
  }

  obtenerTurnoCajaPorId(idTurno: number): Observable<any> {
    return this.http.get(`${this.url}/TurnoCaja/abierta/${idTurno}`);
  }
}
