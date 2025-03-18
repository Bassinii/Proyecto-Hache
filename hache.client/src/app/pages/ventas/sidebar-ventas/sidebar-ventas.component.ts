import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-ventas',
  templateUrl: './sidebar-ventas.component.html',
  styleUrl: './sidebar-ventas.component.css'
})
export class SidebarVentasComponent {

  filtroActivo: string | null = null;
  fechaSeleccionada: string = '';
  medioPagoSeleccionado: number | null = null;

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
    this.fechaSeleccionada = ''; 
    this.medioPagoSeleccionado = null; 
    this.limpiarFiltroEvent.emit();
  }


  seleccionarMedioPago(idMedioPago: number) {
    this.medioPagoSeleccionado = idMedioPago;
    this.medioPagoSeleccionadoEvent.emit(idMedioPago);
  }




}
