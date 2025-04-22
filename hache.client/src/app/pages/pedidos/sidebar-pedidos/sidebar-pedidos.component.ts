import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-pedidos',
  templateUrl: './sidebar-pedidos.component.html',
  styleUrl: './sidebar-pedidos.component.css'
})
export class SidebarPedidosComponent {

  constructor(private router: Router) { }

  RealizarPedido() {
    this.router.navigate(['/pedidos']);
  }

  verPedidos() {
    this.router.navigate(['/pedidos/pedidos-ver-pedidos']);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

}
