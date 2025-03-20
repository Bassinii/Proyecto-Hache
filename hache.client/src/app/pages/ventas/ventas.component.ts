import { Component, OnInit } from '@angular/core';
import { Venta } from '../../core/models/venta';
import { VentasService } from '../../core/services/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit {

  public ventas: Venta[] = [];
  constructor(private ventaServicio_: VentasService) { }

  ngOnInit() {
    this.obtenerVentas();
  }

  obtenerVentas() {
    const userRole = Number(localStorage.getItem('userRole'));
    const idLocal = Number(localStorage.getItem('idLocal'));

    if (userRole === 1) {
      // Si es admin, obtener todas las ventas
      this.ventaServicio_.obtenerVentas().subscribe({
        next: (data) => {
          console.log('Administrador');
          this.ventas = data;
        },
        error: (error) => {
          console.error('❌ Error al recibir todas las ventas:', error);
        }
      });
    } else if (userRole === 2) {
      // Si es vendedor, obtener solo las ventas de su local
      this.ventaServicio_.obtenerVentasPorLocal(idLocal).subscribe({
        next: (data) => {
          this.ventas = data;
        },
        error: (error) => {
          console.error('❌ Error al recibir ventas del local:', error);
        }
      });
    } else {
      console.error('⚠️ Usuario sin permisos válidos:', userRole);
    }
  }

  filtrarPorFecha(fecha: string) {

      if (!fecha || typeof fecha !== 'string') {
        console.error('⚠️ Fecha inválida:', fecha);
        return;
      }

      const fechaValida = new Date(fecha);
      if (isNaN(fechaValida.getTime())) {
        console.error('❌ Fecha inválida después de conversión:', fecha);
        return;
      }

      this.ventaServicio_.obtenerVentasPorFecha(fechaValida).subscribe({
        next: (data) => {
          this.ventas = data.map((venta: any) => ({
            ...venta,
            id: venta.id ?? venta.iD_Venta, 
          }));

          console.log('✅ Ventas normalizadas:', this.ventas);
        },
        error: (error) => {
          console.error('❌ Error al filtrar ventas por fecha:', error);
        }
      });
  }

  onLimpiarFiltro() {
    this.obtenerVentas(); 
  }

  filtrarPorMedioPago(idMedioPago: number) {
    this.ventaServicio_.obtenerVentasPorMedioPago(idMedioPago).subscribe({
      next: (data) => {
        this.ventas = data;
        console.log('✅ Ventas filtradas por medio de pago:', this.ventas);
      },
      error: (error) => {
        console.error('❌ Error al filtrar ventas por medio de pago:', error);
      }
    });
  }
}
