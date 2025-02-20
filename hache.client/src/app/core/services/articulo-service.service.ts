import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from '../models/articulo';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticuloServiceService {

  private url = 'https://localhost:44369/api/Articulo';

  constructor(private httpCliente: HttpClient) { }

  public getArticulos(): Observable<Articulo[]> {
    return this.httpCliente.get<any[]>(this.url).pipe(
      map((articulos) =>
        articulos.map(articulo => ({
          id: articulo.iD_Articulo, // Mapeo de iD_Articulo a id
          nombre: articulo.nombre,
          precio: articulo.precio,
          stock: articulo.stock ?? 0, // Si no existe, se inicializa en 0
          categoria: articulo.categoria,
          marca: articulo.marca,
          imagen: articulo.imagen
        }))
      )
    );
  }

  actualizarArticulo(articulo: Articulo) {
    return this.httpCliente.put(`${this.url}/${articulo.id}`, articulo);
  }
}
