import { Component, OnInit } from '@angular/core';
import { Venta } from '../../../core/models/venta';
import { VentasService } from '../../../core/services/ventas.service';
import { ArticuloServiceService } from '../../../core/services/articulo-service.service';
import { DetalleVenta } from '../../../core/models/detalle-venta';
import { DetalleVentaServiceService } from '../../../core/services/detalle-venta-service.service';
import Swal from 'sweetalert2';
import { MedioDePagoService } from '../../../core/services/medio-de-pago.service';
import { MedioDePago } from '../../../core/models/medio-de-pago';

@Component({
  selector: 'app-admin-venta',
  templateUrl: './admin-venta.component.html',
  styleUrl: './admin-venta.component.css'
})

export class AdminVentaComponent implements OnInit {

  public ventas: Venta[] = [];
  public ventasFiltradas: Venta[] = [];
  public mediosDePago: MedioDePago[] = [];
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
  public mostrarCanvas: boolean = false;
  public detalleVenta: any[] = [];
  public subtotal: number = 0;
  public total: number = 0;

  constructor(
    private ventaServicio_: VentasService,
    private detalleVentaService_: DetalleVentaServiceService,
    private articulosService_: ArticuloServiceService,
    private medioDePagoService_: MedioDePagoService
  ) { }

  ngOnInit() {
    this.obtenerVentas();
    this.obtenerMediosDePago();
  }

  obtenerVentas() {
    this.ventaServicio_.obtenerVentas().subscribe({
      next: (data) => {
        this.ventas = data;
        this.ventasFiltradas = data;
        this.ventas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      },
      error: (error) => {
        console.log('Se produjo un error al recibir las ventas: ', error);
      }
    });
  }

  obtenerMediosDePago() {
    this.medioDePagoService_.obtenerMediosDePago().subscribe({
      next: (data) => {
        this.mediosDePago = data;
      },
      error: (error) => {
        console.error('❌ Error al obtener medios de pago:', error);
      }
    });
  }

  obtenerNombreMedioPago(idMedioPago: number): string {
    const medio = this.mediosDePago.find(m => m.id === idMedioPago);
    return medio ? medio.nombre : 'Desconocido';
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
    Swal.fire({
      text: '¿Estás seguro de que deseas anular la venta?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#f34b4b',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      width: '400px',

      }).then((result) => {
       if (result.isConfirmed) {
          this.ventaServicio_.BajaVenta(idVenta).subscribe({
          next: (mensaje) => {
          Swal.fire({
            title: 'Venta Anulada',
            text: 'La venta se ha anulado correctamente.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
            });
           this.obtenerVentas(); 
           },
          error: (err) => {
            Swal.fire('Error', 'No se pudo eliminar la venta.', 'error');
            console.error('Error al anular la venta:', err);
          }
        });
      }
    });
  }


  verDetalleVenta(idVenta: number) {
    this.detalleVentaService_.getDetalleVentaPorIdVenta(idVenta).subscribe({
      next: (data) => {
        this.detalleVenta = data.map(detalle => ({
          ...detalle,
          imagen: ''  // Se inicializa vacía y luego se actualizará con la imagen
        }));

        this.subtotal = this.detalleVenta.reduce((acc, detalle) => acc + (detalle.precioVenta * detalle.cantidad), 0);
        this.total = this.subtotal;

        // Obtener la imagen para cada artículo
        this.detalleVenta.forEach(detalle => {
          this.articulosService_.getArticuloPorId(detalle.idArticulo).subscribe({
            next: (articulo) => {
              detalle.imagen = articulo[0].imagen;
            },
            error: (error) => {
              console.error(`❌ Error al obtener imagen del artículo ${detalle.idArticulo}:`, error);
            }
          });
        });

        this.mostrarCanvas = true;
      },
      error: (error) => {
        console.error('❌ Error al obtener detalles de la venta:', error);
      }
    });
  }
}
