import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-ventas',
  templateUrl: './sidebar-ventas.component.html',
  styleUrl: './sidebar-ventas.component.css'
})
export class SidebarVentasComponent {

  filtroActivo: string | null = null;
  fechaSeleccionada: string = '';

  @Output() fechaSeleccionadaEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() limpiarFiltroEvent = new EventEmitter<void>();
  @Output() medioPagoSeleccionadoEvent = new EventEmitter<number>();


  toggleFiltro(filtro: string) {
    this.filtroActivo = this.filtroActivo === filtro ? null : filtro;
  }

  aplicarFiltroFecha() {
    if (!this.fechaSeleccionada) {
      console.warn("⚠️ No hay fecha seleccionada.");
      return;
    }
    this.fechaSeleccionadaEvent.emit(this.fechaSeleccionada);
  }

  limpiarFiltro() {
    this.limpiarFiltroEvent.emit();
  }

  
  seleccionarMedioPago(idMedioPago: number) {
    this.medioPagoSeleccionadoEvent.emit(idMedioPago);
  }



}
