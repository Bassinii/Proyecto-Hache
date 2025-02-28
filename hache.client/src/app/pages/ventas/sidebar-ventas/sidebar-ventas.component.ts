import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-ventas',
  templateUrl: './sidebar-ventas.component.html',
  styleUrl: './sidebar-ventas.component.css'
})
export class SidebarVentasComponent {
  filtroActivo: string | null = null;

  toggleFiltro(filtro: string) {
    this.filtroActivo = this.filtroActivo === filtro ? null : filtro;
  }

}
