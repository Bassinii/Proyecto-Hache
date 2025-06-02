import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from '../models/articulo';
import { Categoria } from '../models/categoria';
import { Marca } from '../models/marca';
import { map } from 'rxjs/operators';
import { ArticuloDTO } from '../DTOs/articulo.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticuloServiceService {

  private url: string = environment.apiUrl;

  constructor(private httpCliente: HttpClient) { }

  public getArticulos(): Observable<Articulo[]> {
    return this.httpCliente.get<any[]>(`${this.url}/Articulo`).pipe(
      map((articulos) =>
        articulos.map(articulo => ({
          id: articulo.iD_Articulo,
          nombre: articulo.nombre,
          codigoXubio: articulo.codigoXubio,
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
    return this.httpCliente.put(`${this.url}/Articulo/ActualizarArticulo`, articulo);
  }

  BajaArticulo(idArticulo: number): Observable<any> {
    return this.httpCliente.patch(`${this.url}/Articulo/${idArticulo}`, {});
  }

  getArticuloPorId(id: number): Observable<Articulo[]> {
    return this.httpCliente.get<any[]>(`${this.url}/Articulo/${id}`).pipe(
      map((articulos) =>
        articulos.map(articulo => ({
          id: articulo.iD_Articulo,
          nombre: articulo.nombre,
          codigoXubio: articulo.codigoXubio,
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
    return this.httpCliente.post(`${this.url}/Articulo`, articulo);
  }

  public getArticulosPorCategoria(idCategoria: number): Observable<Articulo[]> {
    return this.httpCliente.get<any[]>(`${this.url}/Articulo/ObtenerArticulosPorCategoria?idCategoria=${idCategoria}`).pipe(
      map((articulos) =>
        articulos.map(articulo => ({
          id: articulo.iD_Articulo,
          codigoXubio: articulo.codigoXubio,
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

  subirImagen(archivo: File, idArticulo: number): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('idArticulo', idArticulo.toString());

    return this.httpCliente.post(`https://localhost:44369/api/Imagen/subir`, formData);
  }



}
