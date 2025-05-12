import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistorialCaja } from '../models/HistorialCaja';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HistorialCajaService {

  private url: string = 'https://localhost:44369/api/HistorialCaja'
  constructor(private httpCliente: HttpClient) { }

  public obtenerHistorialCaja(idLocal: number): Observable<HistorialCaja[]> {
    return this.httpCliente.get<any[]>(`${this.url}?idLocal=${idLocal}`).pipe(
      map((historiales) =>
        historiales.map(h => ({
          iD_HistorialCaja: h.iD_HistorialCaja,
          iD_TurnoCaja: h.iD_TurnoCaja,
          iD_Usuario: h.iD_Usuario,
          iD_Local: h.iD_Local,
          tipoMovimiento: h.tipoMovimiento,
          monto: h.monto,
          fecha: new Date(h.fecha),
          nombreUsuario: h.nombreUsuario,
          observacion: h.observacion ?? '' 
        }))
      )
    );
  }

  public agregarGastoCaja(historial: HistorialCaja): Observable<any> {
    return this.httpCliente.post(this.url, historial);
  }

}
