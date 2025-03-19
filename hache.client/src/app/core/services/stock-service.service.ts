import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stock } from '../models/stock';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { stockDTO } from '../../pages/admin/admin-gestion/stockDTO';


@Injectable({
  providedIn: 'root'
})
export class StockServiceService {

  private url: string = 'https://localhost:44369/api/Stock';
  constructor(private httpCliente: HttpClient) { }

  getStocksLocal(idLocal: number): Observable<stockDTO[]> {
    return this.httpCliente.get<stockDTO[]>(`${this.url}/Local/${idLocal}`);
  }

}
