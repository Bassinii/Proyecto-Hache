import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta } from '../models/venta';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private url: string = 'https://localhost:44369/api/Venta';
  private ventas: Venta[] = []; // Almacena las ventas

  constructor(private httpClient: HttpClient) { }

  public obtenerVentas(): Observable<Venta[]> {
    return this.httpClient.get<any[]>(this.url).pipe(
      map((ventas) => ventas.map((venta) => this.mapVenta(venta))),
      tap((ventas) => {
        this.ventas = ventas; // Guardar ventas en el array
        console.log('Ventas cargadas:', this.ventas); // Mostrar ventas en consola
      })
    );
  }

  private mapVenta(venta: any): Venta {
    return {
      id: venta.iD_Venta,
      usuario: {
        id: venta.iD_Usuario.iD_Usuario,
        tipoUsuario: {
          id: venta.iD_Usuario.tipoUsuario.iD_TipoUsuario,
          nombre: venta.iD_Usuario.tipoUsuario.nombre
        },
        nombreUsuario: venta.iD_Usuario.nombreUsuario,
        contrasenia: venta.iD_Usuario.contrasenia,
        correoElectronico: venta.iD_Usuario.correoElectronico,
        nombreCompleto: venta.iD_Usuario.nombreCompleto,
        idLocal: venta.iD_Usuario.iD_Local
      },
      fecha: new Date(venta.fecha),
      subtotal: venta.subtotal,
      total: venta.total,
      esPedidosYa: venta.esPedidosYa,
      local: {
        id: venta.local.iD_Local,
        nombre: venta.local.nombre
      },
      detalleVenta: venta.detalleVenta.map((detalle: any) => ({
        id: detalle.iD_Detalle,
        idVenta: detalle.iD_Venta,
        idArticulo: detalle.articulo.iD_Articulo,
        cantidad: detalle.cantidad,
        precioUnitario: detalle.precio_Unitario,
        procentajeDescuento: detalle.porcentaje_Descuento
      }))
    };
  }

  // Método opcional para acceder al array de ventas desde otros componentes
  public getVentas(): Venta[] {
    return this.ventas;
  }
}
