import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  filtroActivo: string | null = null;

  toggleFiltro(filtro: string) {
    this.filtroActivo = this.filtroActivo === filtro ? null : filtro;
  }



}
