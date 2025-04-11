import { Component } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {
  pedidos = [
    { dia: 'Todos los días', titulo: 'PANES', imagen: 'panes.jpg' },
    { dia: 'Miércoles - Sábados', titulo: 'ELABORACIÓN PROPIA', imagen: 'elaboracion_propia.jpg' },
    { dia: 'Sábados', titulo: 'PRODUCTOS DE TERCEROS', imagen: 'terceros.jpg' },
    { dia: 'Sábados', titulo: 'MEDIALUNAS', imagen: 'medialunas.jpg' },
    { dia: 'Sábados', titulo: 'ROCHINO', imagen: 'rochino.png' },
  ];
}
