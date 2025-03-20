import { Component, OnInit } from '@angular/core';
import { Venta } from '../../../core/models/venta';
import { VentasService } from '../../../core/services/ventas.service';

@Component({
  selector: 'app-admin-venta',
  templateUrl: './admin-venta.component.html',
  styleUrl: './admin-venta.component.css'
})

export class AdminVentaComponent implements OnInit {

  public ventas: Venta[] = [];
  public ventasFiltradas: Venta[] = [];
  mostrarConfirmacion: boolean = false;


  // Filtros
  public filtros = {  
    fecha: '',
    local: '',
    medioPago: '',
    montoMin: null,
    montoMax: null,
    numeroVenta: null
  };

  constructor(private ventaServicio_: VentasService) { }

  ngOnInit() {
    this.obtenerVentas();
  }

  obtenerVentas() {
    this.ventaServicio_.obtenerVentas().subscribe({
      next: (data) => {
        this.ventas = data;
        this.ventasFiltradas = data; 
      },
      error: (error) => {
        console.log('Se produjo un error al recibir las ventas: ', error);
      }
    });
  }

  filtrarVentas() {
    const mediosDePagoMap: { [key: string]: number } = {
      'Efectivo': 1,
      'Débito': 2,
      'Crédito': 3,
      'Mercado Pago': 4
    };

    this.ventasFiltradas = this.ventas.filter((venta) => {
      const fechaVenta = new Date(venta.fecha);
      fechaVenta.setHours(fechaVenta.getHours() - 3); // Ajusta a UTC-3

      const fechaFiltro = this.filtros.fecha ? new Date(this.filtros.fecha + 'T00:00:00') : null;
      const medioPagoFiltro = this.filtros.medioPago ? mediosDePagoMap[this.filtros.medioPago] : null;

      return (
        (!fechaFiltro ||
          (fechaVenta.getFullYear() === fechaFiltro.getFullYear() &&
            fechaVenta.getMonth() === fechaFiltro.getMonth() &&
            fechaVenta.getDate() === fechaFiltro.getDate())) &&
        (!this.filtros.local || venta.local.nombre.includes(this.filtros.local)) &&
        (!medioPagoFiltro || venta.idMedioDePago === medioPagoFiltro) && // <-- Filtro corregido
        (!this.filtros.montoMin || venta.total >= this.filtros.montoMin) &&
        (!this.filtros.montoMax || venta.total <= this.filtros.montoMax) &&
        (!this.filtros.numeroVenta || `${venta.id}`.includes(`${this.filtros.numeroVenta}`))
      );
    });
  }

  limpiarFiltros() {
    this.filtros = { fecha: '', local: '', medioPago: '', montoMin: null, montoMax: null, numeroVenta: null };
    this.filtrarVentas();
  }

  BajaVenta(idVenta: number) {
  if (!confirm(`¿Estás seguro de que deseas anular la venta ${idVenta}?`)) {
    return;
  }

  this.ventaServicio_.BajaVenta(idVenta).subscribe({
    next: (mensaje) => {
      console.log(mensaje);

      setTimeout(() => {
        this.mostrarConfirmacion = true;
        setTimeout(() => {
          this.mostrarConfirmacion = false;
        }, 1000);
      }, 300);
      this.obtenerVentas(); 
    },
    error: (err) => {
      console.error('Error al anular la venta:', err);
    }
  });
}

}
