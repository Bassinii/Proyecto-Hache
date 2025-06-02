import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta } from '../models/venta';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { VentaDTO } from '../DTOs/venta.dto';
import { ComprobanteVentaDto } from '../DTOs/comprobante-venta.dto';
import { recaudacionPorMPDTO } from '../DTOs/recaudacionPorMP.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private url: string = environment.apiUrl
  private ventas: Venta[] = [];
  private venta?: Venta;

  constructor(private httpClient: HttpClient) { }

  private mapVenta(venta: any): Venta {
    return {
      id: venta.iD_Venta,
      idUsuario: venta.iD_Usuario,
      idMedioDePago: venta.iD_MedioDePago,
      fecha: new Date(venta.fecha),
      subtotal: venta.subtotal,
      total: venta.total,
      esPedidosYa: venta.esPedidosYa,
      transaccionIdXubio: venta.transaccionIdXubio,
      local: {
        id: venta.iD_Local,
        nombre: 'vacio'
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

  public obtenerVentas(): Observable<Venta[]> {
    return this.httpClient.get<any[]>(`${this.url}/Venta`).pipe(
      map((ventas) => ventas.map((venta) => this.mapVenta(venta))),
    );
  }

  public getVentas(): Venta[] {
    return this.ventas;
  }

  agregarVenta(venta: VentaDTO): Observable<VentaDTO> {
    return this.httpClient.post<VentaDTO>(`${this.url}/Venta`, venta);
  }

  public obtenerVentasPorFecha(fecha: Date): Observable<Venta[]> {
    const fechaFormateada = fecha.toISOString().split('T')[0]; // YYYY-MM-DD
    console.log('Fecha enviada al backend:', fechaFormateada);

    return this.httpClient.get<any[]>(`${this.url}/Venta/fecha/${fechaFormateada}`).pipe(
      map((ventas) => ventas.map((venta) => this.mapVenta(venta))),
      tap((ventas) => console.log('Ventas obtenidas por fecha:', ventas))
    );
  }

  public obtenerVentasPorMedioPago(idMedioPago: number): Observable<Venta[]> {
    return this.httpClient.get<Venta[]>(`${this.url}/Venta/VentaMedioPago/${idMedioPago}`).pipe(
      map((ventas) => ventas.map((venta) => this.mapVenta(venta))),
      tap((ventas) => console.log('Ventas por medio de pago:', ventas))
    );
  }

  public BajaVenta(idVenta: number): Observable<string> {
    return this.httpClient.patch<string>(`${this.url}/Venta/BajaVenta?idVenta=${idVenta}`, null);
  }

  public obtenerVentasPorLocal(idLocal: number): Observable<Venta[]> {
    return this.httpClient.get<Venta[]>(`${this.url}/Venta/VentaPorLocal/${idLocal}`).pipe(
      map((ventas) => ventas.map((venta) => this.mapVenta(venta))),
      tap((ventas) => console.log('Ventas por local:', ventas))
    );
  }

  public obtenerVentaPorId(idVenta: number): Observable<Venta> {
    return this.httpClient.get<Venta>(`${this.url}/Venta/id/${idVenta}`).pipe(
      map((venta) => this.mapVenta(venta))
    );
  }

  public subirComprobante(comprobante: ComprobanteVentaDto): Observable<ComprobanteVentaDto> {
    return this.httpClient.post<ComprobanteVentaDto>(`${this.url}/Venta/Comprobantes`, comprobante);
  }

  public eliminarComprobante(id: number) {
    return this.httpClient.delete(`${this.url}/Venta/Comprobantes/${id}`);
  }

  public obtenerRecaudacionPorMedioPago(fecha: Date, idLocal: number): Observable<recaudacionPorMPDTO[]> {

    const fechaFormateada = fecha.toISOString().split('T')[0];

    return this.httpClient.get<recaudacionPorMPDTO[]>(
      `${this.url}/Venta/ObtenerRecaudacionPorMP?fecha=${fechaFormateada}&idLocal= ${ idLocal }`
    )
  }

  public obtenerVentaAnuladas(): Observable<Venta[]> {
    return this.httpClient.get<Venta[]>(`${this.url}/Venta/ObtenerVentasAnuladas`).pipe(
      map((ventas) => ventas.map((venta) => this.mapVenta(venta)))
    );
  }
}
