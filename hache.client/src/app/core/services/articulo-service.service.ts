import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticuloServiceService {

  private url = 'https://localhost:44369/api/Articulo';
  constructor(private httpCliente: HttpClient) { }

  public getArticulos() : Observable<any> {
    return this.httpCliente.get<any>(this.url);
  }
}
