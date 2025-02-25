import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-carrito-item',
  templateUrl: './carrito-item.component.html',
  styleUrl: './carrito-item.component.css'
})
export class CarritoItemComponent {
  @Input() nombre!: string;
  @Input() precio!: number;
  @Input() cantidad!: number;
  @Input() imagenUrl!: string;

  @Output() quantityChange = new EventEmitter<number>();
  @Output() remove = new EventEmitter<void>();

  aumentarCantidad() {
    this.cantidad++;
    this.quantityChange.emit(this.cantidad);
  }

  disminuirCantidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
      this.quantityChange.emit(this.cantidad);
    }
  }

  removeItem() {
    this.remove.emit();
  }
}
