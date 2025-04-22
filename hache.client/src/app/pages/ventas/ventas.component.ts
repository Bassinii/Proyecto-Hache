import { Component, OnInit } from '@angular/core';
import { Venta } from '../../core/models/venta';
import { VentasService } from '../../core/services/ventas.service';
import { ArticuloServiceService } from '../../core/services/articulo-service.service';
import { DetalleVenta } from '../../core/models/detalle-venta';
import { DetalleVentaServiceService } from '../../core/services/detalle-venta-service.service';
import { MedioDePago } from '../../core/models/medio-de-pago';
import { MedioDePagoService } from '../../core/services/medio-de-pago.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit {

  public ventas: Venta[] = [];
  public mediosDePago: MedioDePago[] = [];

  mostrarConfirmacion: boolean = false;

  cargando: boolean = true;

  public paginaActual: number = 1;
  public ventasPorPagina: number = 10;
  public opcionesPorPagina: number[] = [10, 20, 50];

  public mostrarCanvas: boolean = false;
  public detalleVenta: any[] = [];
  public subtotal: number = 0; 
  public total: number = 0;

  public venta: any;

  constructor(
    private ventaServicio_: VentasService,
    private detalleVentaService_: DetalleVentaServiceService,
    private articulosService_: ArticuloServiceService,
    private medioDePagoService_: MedioDePagoService
  ) { }

  getFilasFaltantes(): number[] {
    return Array.from({ length: Math.max(0, 10 - this.ventasPaginadas.length) });
  }

  ngOnInit() {
    this.obtenerVentas();
    this.obtenerMediosDePago();
  }

  cerrarCanvas() {
    this.mostrarCanvas = false;
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


  obtenerVentas() {
    this.cargando = true;

    const userRole = Number(localStorage.getItem('userRole'));
    const idLocal = Number(localStorage.getItem('idLocal'));



    let ventasObservable = userRole === 1
      ? this.ventaServicio_.obtenerVentas()
      : this.ventaServicio_.obtenerVentasPorLocal(idLocal);

    ventasObservable.subscribe({
      next: (data) => {
        this.ventas = data.map((venta) => ({
          ...venta,
          nombreMedioPago: this.obtenerNombreMedioPago(venta.idMedioDePago)
           
        }));
        this.cargando = false;
        this.ventas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      },
      error: (error) => {
        this.cargando = false;
        console.error('❌ Error al recibir ventas:', error);
      }
    });
  }


  filtrarPorMedioPago(idMedioPago: number) {
    this.ventaServicio_.obtenerVentasPorMedioPago(idMedioPago).subscribe({
      next: (data) => {
        let ventasFiltradas = data.map((venta) => ({
          ...venta,
          nombreMedioPago: this.obtenerNombreMedioPago(idMedioPago)
        }));

        const userRole = Number(localStorage.getItem('userRole'));
        const idLocal = Number(localStorage.getItem('idLocal'));

        if (userRole === 2) {
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
          nombreMedioPago: this.obtenerNombreMedioPago(venta.idMedioDePago)
        }));
        console.log('📊 Ventas filtradas por fecha:', data);

        if (userRole === 2) {
          ventasFiltradas = ventasFiltradas.filter(venta => venta.local.id === idLocal);
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
      scrollbarPadding: false,
      didOpen: () => {
        document.body.style.width = `${document.body.clientWidth}px`; // Mantiene el ancho
      },
      willClose: () => {
        document.body.style.width = ''; // Restaura el ancho
      }


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
    this.paginaActual = 1; 
  }

  verDetalleVenta(idVenta: number) {
    this.ventaServicio_.obtenerVentaPorId(idVenta).subscribe({
      next: (data) => {
        this.venta = data;
        console.log(this.venta);
      }
    })
    console.log(this.venta);

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
