import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stock } from '../models/stock';
import { map } from 'rxjs/operators'
import { Observable, Subject } from 'rxjs';
import { stockDTO } from '../../pages/admin/admin-gestion/stockDTO';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StockServiceService {

  private url: string = environment.apiUrl;

  private actualizarListadoArticulosSubject = new Subject<void>();
  constructor(private httpCliente: HttpClient) { }

  getStocksLocal(idLocal: number): Observable<stockDTO[]> {
    return this.httpCliente.get<stockDTO[]>(`${this.url}/Stock/Local/${idLocal}`);
  }

  editarStock(idStock: number, cantidad: number): Observable<any> {
    return this.httpCliente.patch(`${this.url}/Stock?idStock=${idStock}&cantidad=${cantidad}`, null);
  }

  actualizarListadoArticulos$ = this.actualizarListadoArticulosSubject.asObservable();

  emitirActualizacionArticulos() {
    this.actualizarListadoArticulosSubject.next();
  }

  agregarOActualizarStock(idArticulo: number, idLocal: number, cantidad: number): Observable<any> {
    const url = `${this.url}/Stock/agregarOActualizarStock?idArticulo=${idArticulo}&idLocal=${idLocal}&cantidad=${cantidad}`;
    return this.httpCliente.patch(url, null);
  }


}
