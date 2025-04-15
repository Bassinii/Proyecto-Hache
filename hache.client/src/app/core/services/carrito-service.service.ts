import { Injectable, signal } from '@angular/core';
import { Articulo } from '../models/articulo';
import { ArticuloCarrito } from '../models/articulo-carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoServiceService {
  private carritoSignal = signal<ArticuloCarrito[]>([]);

  public getCarrito() {
    return this.carritoSignal();
  }

  public carrito = this.carritoSignal; // Acceso para señales reactivas

  public añadirAlCarrito(articuloAñadido: Articulo) {
    const carrito = [...this.carritoSignal()];
    const index = carrito.findIndex(item => item.articulo.id === articuloAñadido.id);

    if (index !== -1) {
      carrito[index].cantidad++;
    } else {
      carrito.push(new ArticuloCarrito(articuloAñadido, 1, 0));
    }

    this.carritoSignal.set(carrito);
  }

  public actualizarCantidad(id: number, nuevaCantidad: number) {
    const carrito = [...this.carritoSignal()];
    const index = carrito.findIndex(item => item.articulo.id === id);
    if (index !== -1) {
      carrito[index].cantidad = nuevaCantidad;
      this.carritoSignal.set(carrito);
    }
  }

  public vaciarCarrito() {
    this.carritoSignal.set([]);
  }

  public eliminarDelCarrito(id: number) {
    const nuevoCarrito = this.carritoSignal().filter(item => item.articulo.id !== id);
    this.carritoSignal.set(nuevoCarrito);
  }

  public getTotal() {
    return this.carritoSignal().reduce((total, producto) =>
      total + (producto.articulo.precio * producto.cantidad) - producto.montoDescuento, 0
    );
  }
}
