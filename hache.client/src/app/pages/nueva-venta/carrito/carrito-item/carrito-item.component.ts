import { Component, Input } from '@angular/core';

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

}
