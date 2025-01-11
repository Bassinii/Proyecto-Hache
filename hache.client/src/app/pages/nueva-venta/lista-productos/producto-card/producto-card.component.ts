import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrl: './producto-card.component.css'
})
export class ProductoCardComponent {
  @Input() nombre!: string;
  @Input() precio!: number;
  @Input() imagenUrl!: string;

}
