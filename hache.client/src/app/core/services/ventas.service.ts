import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta } from '../models/venta';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { VentaDTO } from '../DTOs/venta.dto';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private url: string = 'https://localhost:44369/api/Venta';
  private ventas: Venta[] = []; 

  constructor(private httpClient: HttpClient) { }

  public obtenerVentas(): Observable<Venta[]> {
    return this.httpClient.get<any[]>(this.url).pipe(
      map((ventas) => ventas.map((venta) => this.mapVenta(venta))),
    );
  }

  private mapVenta(venta: any): Venta {
    return {
      id: venta.iD_Venta,
      idUsuario: venta.iD_Usuario,
      idMedioDePago: venta.iD_MedioDePago,
      fecha: new Date(venta.fecha),
      subtotal: venta.subtotal,
      total: venta.total,
      esPedidosYa: venta.esPedidosYa,
      local: {
        id: venta.iD_Local,
        nombre: 'venta.local.nombre'
      },
      detalleVenta: venta.detalleVenta.map((detalle: any) => ({
        id: detalle.iD_Detalle,
        idVenta: detalle.iD_Venta,
        idArticulo: detalle.iD_Articulo,
        cantidad: detalle.cantidad,
        precioUnitario: detalle.precio_Unitario,
        precioVenta: detalle.precio_Venta
      }))
    };
  }

  
  public getVentas(): Venta[] {
    return this.ventas;
  }


  
  agregarVenta(venta: VentaDTO): Observable<VentaDTO> {
    return this.httpClient.post<VentaDTO>(`${this.url}`, venta);
  }

  public obtenerVentasPorFecha(fecha: Date): Observable<Venta[]> {
    const fechaFormateada = fecha.toISOString().split('T')[0]; // YYYY-MM-DD
    console.log('Fecha enviada al backend:', fechaFormateada);

    return this.httpClient.get<any[]>(`${this.url}/fecha/${fechaFormateada}`).pipe(
      map((ventas) => ventas.map((venta) => this.mapVenta(venta))),
      tap((ventas) => console.log('Ventas obtenidas por fecha:', ventas))
    );
  }


  public obtenerVentasPorMedioPago(idMedioPago: number): Observable<Venta[]> {
    return this.httpClient.get<Venta[]>(`${this.url}/VentaMedioPago/${idMedioPago}`).pipe(
      map((ventas) => ventas.map((venta) => this.mapVenta(venta))),
      tap((ventas) => console.log('Ventas por medio de pago:', ventas))
    );
  }

  BajaVenta(idVenta: number): Observable<string> {
    return this.httpClient.patch<string>(`${this.url}/BajaVenta?idVenta=${idVenta}`, null);
  }

  public obtenerVentasPorLocal(idLocal: number): Observable<Venta[]> {
    return this.httpClient.get<Venta[]>(`${this.url}/VentaPorLocal/${idLocal}`).pipe(
      map((ventas) => ventas.map((venta) => this.mapVenta(venta))),
      tap((ventas) => console.log('Ventas por local:', ventas))
    );
  }




}
