import { Component, OnInit } from '@angular/core';
import { Venta } from '../../core/models/venta';
import { VentasService } from '../../core/services/ventas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit {

  public ventas: Venta[] = [];
  mostrarConfirmacion: boolean = false;

  public paginaActual: number = 1;
  public ventasPorPagina: number = 10;
  public opcionesPorPagina: number[] = [10, 20, 50]; 
  
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
          //console.log('Administrador');
          this.ventas = data;
          this.ventas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
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
          this.ventas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
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

    const userRole = Number(localStorage.getItem('userRole'));
    const idLocal = Number(localStorage.getItem('idLocal'));

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
        let ventasFiltradas = data.map((venta: any) => ({
          ...venta,
          id: venta.id ?? venta.iD_Venta,
        }));

        if (userRole === 2) {
          ventasFiltradas = ventasFiltradas.filter(venta => venta.idLocal === idLocal);
        }
        this.ventas = ventasFiltradas;
        this.ventas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
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

    const userRole = Number(localStorage.getItem('userRole'));
    const idLocal = Number(localStorage.getItem('idLocal'));

    this.ventaServicio_.obtenerVentasPorMedioPago(idMedioPago).subscribe({
      next: (data) => {
        let ventasFiltradas = data;

        if (userRole === 2) {
          // Si es vendedor, filtrar solo las ventas de su local
          ventasFiltradas = ventasFiltradas.filter(venta => venta.local.id === idLocal);
        }

        this.ventas = ventasFiltradas;
        this.ventas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      },
      error: (error) => {
        console.error('❌ Error al filtrar ventas por medio de pago:', error);
      }
    });
  }

  BajaVenta(idVenta: number) {
    Swal.fire({
      //title: '¿Estás seguro de que deseas anular la venta?',
      text: '¿Estás seguro de que deseas anular la venta?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#f34b4b',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, anular',
      cancelButtonText: 'Cancelar',
      width: '400px',

    }).then((result) => {
      if (result.isConfirmed) {
        this.ventaServicio_.BajaVenta(idVenta).subscribe({
          next: () => {
            Swal.fire({
              title: 'Venta anulada',
              text: 'La venta ha sido eliminada correctamente.',
              icon: 'success',
              timer: 2000, 
              showConfirmButton: false
            });
            this.obtenerVentas();
          },
          error: (error) => {
            Swal.fire('Error', 'No se pudo eliminar la venta.', 'error');
            console.error('❌ Error al eliminar la venta:', error);
          }
        });
      }
    });
  }

  get ventasPaginadas(): Venta[] {
    const inicio = (this.paginaActual - 1) * this.ventasPorPagina;
    const fin = inicio + this.ventasPorPagina;
    return this.ventas.slice(inicio, fin);
  }

  cambiarPagina(nuevaPagina: number) {
    this.paginaActual = nuevaPagina;
  }

  cambiarCantidadPorPagina(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.ventasPorPagina = Number(target.value);
    this.paginaActual = 1; // Reiniciamos a la primera página
  }

}
