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
    this.ventaServicio_.obtenerVentas().subscribe({
      next: (data) => {
        this.ventas = data;
      },
      error: (error) => {
        console.log('Se produjo un error al recibir las ventas: ', error);

      }
    })
    console.log(this.ventas);
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
