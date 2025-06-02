import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistorialCaja } from '../models/HistorialCaja';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HistorialCajaService {

  private url: string = environment.apiUrl
  constructor(private httpCliente: HttpClient) { }

  public obtenerHistorialCaja(idLocal: number): Observable<HistorialCaja[]> {
    return this.httpCliente.get<any[]>(`${this.url}/Articulo?idLocal=${idLocal}`).pipe(
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
    return this.httpCliente.post(`${this.url}/Articulo`, historial);
  }

}
