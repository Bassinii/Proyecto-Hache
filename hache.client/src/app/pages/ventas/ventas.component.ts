import { Component, OnInit } from '@angular/core';
import { Venta } from '../../core/models/venta';
import { VentasService } from '../../core/services/ventas.service';
import { ArticuloServiceService } from '../../core/services/articulo-service.service';
import { DetalleVenta } from '../../core/models/detalle-venta';
import { DetalleVentaServiceService } from '../../core/services/detalle-venta-service.service';
import { MedioDePago } from '../../core/models/medio-de-pago';
import { MedioDePagoService } from '../../core/services/medio-de-pago.service';
import Swal from 'sweetalert2';
import { LocalService } from '../../core/services/local.service';
import { jwtDecode } from 'jwt-decode';


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
    private medioDePagoService_: MedioDePagoService,
    private localService_ : LocalService
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

    let userRole: number;
    let idLocal: number;

    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token no encontrado.');
      return;
    }
    try {
      const decodedToken: any = jwtDecode(token);
      idLocal = Number(decodedToken['ID_Local']);
      userRole = Number(decodedToken['userRole']);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return;
    }

    if (!idLocal||!userRole) return;

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

        let userRole: number;
        let idLocal: number;

        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error('Token no encontrado.');
          return;
        }
        try {
          const decodedToken: any = jwtDecode(token);
          idLocal = Number(decodedToken['ID_Local']);
          userRole = Number(decodedToken['userRole']);
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          return;
        }

        if (!idLocal || !userRole) return;

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

    let userRole: number;
    let idLocal: number;

    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token no encontrado.');
      return;
    }
    try {
      const decodedToken: any = jwtDecode(token);
      idLocal = Number(decodedToken['ID_Local']);
      userRole = Number(decodedToken['userRole']);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return;
    }

    if (!idLocal || !userRole) return;

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


  BajaVenta(venta: Venta) {
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
        this.ventaServicio_.BajaVenta(venta.id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Venta anulada',
              text: 'La venta ha sido eliminada correctamente.',
              icon: 'success',
              timer: 2000, 
              showConfirmButton: false

            });
            console.log('VENTA QUE LLEGA A XUBIO: ', venta);
            if (venta.transaccionIdXubio != null) {
              this.ventaServicio_.eliminarComprobante(venta.transaccionIdXubio).subscribe({
                next: (data) => {
                  console.log('Se elimino el comprobante de xubio');
                },
                error: (error) => {
                  console.error('❌ Error al eliminar el comprobante:', error);
                }
              });
            }
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

        // Obtener el local completo por ID
        this.localService_.obtenerLocalPorId(this.venta.local.id).subscribe({
          next: (local) => {
            this.venta.local = local;
          },
          error: (err) => {
            console.error('❌ Error al obtener el local:', err);
          }
        });

        // Obtener el medio de pago por ID
        this.medioDePagoService_.obtenerMedioDePagoPorId(this.venta.idMedioDePago).subscribe({
          next: (medioPago) => {
            this.venta.nombreMedioPago = medioPago.nombre;
          },
          error: (err) => {
            console.error('❌ Error al obtener medio de pago:', err);
          }
        });

        // Obtener el detalle de la venta
        this.detalleVentaService_.getDetalleVentaPorIdVenta(idVenta).subscribe({
          next: (data) => {
            this.detalleVenta = data.map(detalle => ({
              ...detalle,
              imagen: ''
            }));

            this.subtotal = this.detalleVenta.reduce((acc, detalle) => acc + (detalle.precioVenta * detalle.cantidad), 0);
            this.total = this.subtotal;

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
      },
      error: (err) => {
        console.error('❌ Error al obtener la venta por ID:', err);
      }
    });
  }


}
