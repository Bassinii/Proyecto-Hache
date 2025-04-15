import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from '../models/articulo';
import { Categoria } from '../models/categoria';
import { Marca } from '../models/marca';
import { map } from 'rxjs/operators';
import { ArticuloDTO } from '../DTOs/articulo.dto';

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
          id: articulo.iD_Articulo,
          nombre: articulo.nombre,
          precio: articulo.precio,
          categoria: articulo.categoria
            ? ({ id: articulo.categoria.iD_Categoria, nombre: articulo.categoria.nombre } as Categoria)
            : null,
          marca: articulo.marca
            ? ({ id: articulo.marca.iD_Marca, nombre: articulo.marca.nombre } as Marca)
            : null,
          imagen: articulo.imagen && articulo.imagen.length > 0
            ? articulo.imagen
            : [{ id: 1, idArticulo: articulo.iD_Articulo, url: "assets/images/articles/noimage.png" }]
        }) as Articulo)
      )
    );
  }

  actualizarArticulo(articulo: Articulo) : Observable<any> {
    return this.httpCliente.put(`${this.url}/ActualizarArticulo`, articulo);
  }

  BajaArticulo(idArticulo: number): Observable<any> {
    return this.httpCliente.patch(`${this.url}/baja-Articulo/${idArticulo}`, {});
  }

  getArticuloPorId(id: number): Observable<Articulo[]> {
    return this.httpCliente.get<any[]>(`${this.url}/${id}`).pipe(
      map((articulos) =>
        articulos.map(articulo => ({
          id: articulo.iD_Articulo,
          nombre: articulo.nombre,
          precio: articulo.precio,
          stock: articulo.stock ?? 0,
          categoria: articulo.categoria
            ? ({ id: articulo.categoria.iD_Categoria, nombre: articulo.categoria.nombre } as Categoria)
            : null,
          marca: articulo.marca
            ? ({ id: articulo.marca.iD_Marca, nombre: articulo.marca.nombre } as Marca)
            : null,
          imagen: articulo.imagen
        }) as Articulo)
      )
    );
  }

  agregarArticulo(articulo: ArticuloDTO): Observable<any> {
    return this.httpCliente.post(this.url, articulo);
  }

  public getArticulosPorCategoria(idCategoria: number): Observable<Articulo[]> {
    return this.httpCliente.get<any[]>(`${this.url}/ObtenerArticulosPorCategoria?idCategoria=${idCategoria}`).pipe(
      map((articulos) =>
        articulos.map(articulo => ({
          id: articulo.iD_Articulo,
          nombre: articulo.nombre,
          precio: articulo.precio,
          stock: articulo.stock ?? 0,
          categoria: articulo.categoria
            ? ({ id: articulo.categoria.iD_Categoria, nombre: articulo.categoria.nombre } as Categoria)
            : null,
          marca: articulo.marca
            ? ({ id: articulo.marca.iD_Marca, nombre: articulo.marca.nombre } as Marca)
            : null,
          imagen: articulo.imagen && articulo.imagen.length > 0
            ? articulo.imagen
            : [{ id: 1, idArticulo: articulo.iD_Articulo, url: "assets/images/articles/noimage.png" }]
        }) as Articulo)
      )
    );
  }


}
