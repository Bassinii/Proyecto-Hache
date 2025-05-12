import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ArticuloCarrito } from '../../../../core/models/articulo-carrito';

@Component({
  selector: 'app-modal-aplicar-descuento',
  templateUrl: './modal-aplicar-descuento.component.html',
  styleUrls: ['./modal-aplicar-descuento.component.css']
})
export class ModalAplicarDescuentoComponent implements OnInit {
  @Input() articulo!: ArticuloCarrito;
  @Output() cerrarModal = new EventEmitter<void>();

  tipoDescuento: string = 'porcentaje';
  valorInput: number = 0;
  montoDescuentoCalculado: number = 0;

  ngOnInit(): void {
    this.aplicarDescuento();
  }

  subtotal(): number {
    return this.articulo.articulo.precio * this.articulo.cantidad;
  }

  aplicarDescuento(): void {
    if (this.tipoDescuento === 'porcentaje') {
      this.montoDescuentoCalculado = (this.subtotal() * this.valorInput) / 100;
    } else {
      this.montoDescuentoCalculado = this.valorInput;
    }
  }

  validarDescuento(event: any): void {
    let valor = Number(event.target.value);
    const max = this.tipoDescuento === 'porcentaje' ? 100 : this.subtotal();

    if (valor > max) valor = max;
    if (valor < 0) valor = 0;

    this.valorInput = valor;
    event.target.value = valor;
    this.aplicarDescuento();
  }

  onTipoDescuentoChange(): void {
    const max = this.tipoDescuento === 'porcentaje' ? 100 : this.subtotal();
    if (this.valorInput > max) {
      this.valorInput = max;
    }
    this.aplicarDescuento();
  }

  cerrar(): void {
    this.articulo.montoDescuento = this.montoDescuentoCalculado;
    this.cerrarModal.emit();
  }

  cancelar(): void {
    this.cerrarModal.emit();
  }
}
