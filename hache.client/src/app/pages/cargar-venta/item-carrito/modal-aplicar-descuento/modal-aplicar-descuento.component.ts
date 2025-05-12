import { Component, computed, DoCheck, EventEmitter, Input, Output, Signal, signal } from '@angular/core';
import { Articulo } from '../../../../core/models/articulo';
import { ArticuloCarrito } from '../../../../core/models/articulo-carrito';

@Component({
  selector: 'app-modal-aplicar-descuento',
  templateUrl: './modal-aplicar-descuento.component.html',
  styleUrl: './modal-aplicar-descuento.component.css'
})
export class ModalAplicarDescuentoComponent implements DoCheck {
  @Input() articulo!: ArticuloCarrito;
  @Output() cerrarModal = new EventEmitter<void>(); // Notifica cuando se cierra el modal

  mostrarModal = true;

  tipoDescuento: string = 'porcentaje';
  numeroDescuento = signal(0);
  montoDescuento = signal(0);
  subtotal = computed(() => {
    let subtotal = 0;
    subtotal = this.articulo.articulo.precio * this.articulo.cantidad
    return subtotal;
  }
  )
  valorInput = 0;
  cerrar() {
    this.cerrarModal.emit();
    this.mostrarModal = false;
  }



  ngDoCheck() {
    this.numeroDescuento.set(this.valorInput); // sincronizar manualmente el signal
    this.aplicarDescuento();
  }

  //calcularDescuento(): number {
  //  let precioOriginal = this.articulo.articulo.precio;
  //  if (this.tipoDescuento === 'porcentaje') {
  //    return ((precioOriginal * this.articulo.cantidad) * (this.valorDescuento / 100));
  //  } else {
  //    return this.valorDescuento;
  //  }
  //}

  //aplicarDescuento() {
  //  this.articulo.montoDescuento = this.calcularDescuento();
  //  this.cerrar();
  // }

  aplicarDescuento(): void {
    if (this.tipoDescuento === "porcentaje") {
      this.montoDescuento.set(this.subtotal() * this.numeroDescuento() / 100);
    } else {
      this.montoDescuento.set(this.numeroDescuento());
    }

    console.log('Monto Descuento: ', this.montoDescuento());
    this.articulo.montoDescuento = this.montoDescuento(); // <-- actualiza solo en este punto
  }

  validarDescuento(event: any): void {
    let valor = Number(event.target.value);

    if (this.tipoDescuento === "porcentaje") {
      if (valor > 100) {
        valor = 100;
      }
    } else {
      if (valor > this.subtotal()) {
        valor = Number(this.subtotal().toFixed(2));
      }
    }
    event.target.value = valor;
    this.numeroDescuento.set(valor); // Asegurar que el valor se actualiza en la variable
  }

  validarTipoDescuento(event: any): void {
    if (this.tipoDescuento === "porcentaje" && this.numeroDescuento() > 100) {
      this.numeroDescuento.set(100); // Ajusta al máximo permitido
    } else if (this.tipoDescuento === "monto" && this.numeroDescuento() > this.articulo.articulo.precio * this.articulo.cantidad) {
      this.numeroDescuento.set(this.subtotal()); // Ajusta al subtotal
    }
  }
}
