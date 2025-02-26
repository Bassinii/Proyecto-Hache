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
        iD_Usuario: venta.iD_Usuario.iD_Usuario,
        tipoUsuario: {
          id: venta.iD_Usuario.tipoUsuario.iD_TipoUsuario,
          nombre: venta.iD_Usuario.tipoUsuario.nombre
        },
        nombreUsuario: venta.iD_Usuario.nombreUsuario,
        contrasenia: venta.iD_Usuario.contrasenia,
        correoElectronico: venta.iD_Usuario.correoElectronico,
        nombreCompleto: venta.iD_Usuario.nombreCompleto,
        iD_Local: venta.iD_Usuario.iD_Local
      },
      idMedioDePago: venta.iD_MedioDePago,
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
        idArticulo: detalle.iD_Articulo,
        cantidad: detalle.cantidad,
        precioUnitario: detalle.precio_Unitario,
        porcentajeDescuento: detalle.porcentaje_Descuento
      }))
    };
  }

  // Método opcional para acceder al array de ventas desde otros componentes
  public getVentas(): Venta[] {
    return this.ventas;
  }

  private mapearVenta(venta: Venta): any {
    return {
      iD_Venta: venta.id,
      iD_Usuario: {
        iD_Usuario: venta.usuario.iD_Usuario,
        tipoUsuario: {
          iD_TipoUsuario: venta.usuario.tipoUsuario.id,
          nombre: venta.usuario.tipoUsuario.nombre
        },
        nombreUsuario: venta.usuario.nombreUsuario,
        contrasenia: venta.usuario.contrasenia,
        correoElectronico: venta.usuario.correoElectronico,
        nombreCompleto: venta.usuario.nombreCompleto,
        iD_Local: venta.usuario.iD_Local
      },
      iD_MedioDePago: venta.idMedioDePago,
      fecha: venta.fecha,
      subtotal: venta.subtotal,
      total: venta.total,
      esPedidosYa: venta.esPedidosYa,
      local: {
        iD_Local: venta.local.id,
        nombre: venta.local.nombre
      },
      detalleVenta: venta.detalleVenta.map((detalle) => ({
        iD_Detalle: detalle.id,
        iD_Venta: detalle.idVenta,
        iD_Articulo: detalle.idArticulo,
        cantidad: detalle.cantidad,
        precio_Unitario: detalle.precioUnitario,
        porcentaje_Descuento: detalle.porcentajeDescuento
      }))
    };
  }

  // 🚀 Método para enviar la venta al backend
  agregarVenta(venta: Venta): Observable<Venta> {
    const ventaMapeada = this.mapearVenta(venta);
    return this.httpClient.post<Venta>(`${this.url}`, ventaMapeada);
  }
}
