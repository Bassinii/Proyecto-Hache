import { Component, OnInit } from '@angular/core';
import { Venta } from '../../../core/models/venta';
import { VentasService } from '../../../core/services/ventas.service';
import { ArticuloServiceService } from '../../../core/services/articulo-service.service';
import { DetalleVenta } from '../../../core/models/detalle-venta';
import { DetalleVentaServiceService } from '../../../core/services/detalle-venta-service.service';
import Swal from 'sweetalert2';
import { MedioDePagoService } from '../../../core/services/medio-de-pago.service';
import { MedioDePago } from '../../../core/models/medio-de-pago';
import { LocalService } from '../../../core/services/local.service';
import { Local } from '../../../core/models/local';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-admin-venta',
  templateUrl: './admin-venta.component.html',
  styleUrl: './admin-venta.component.css'
})

export class AdminVentaComponent implements OnInit {

  public ventas: Venta[] = [];
  
  public venta: any;

  public mediosDePago: MedioDePago[] = [];
  public local: Local[] = [];
  mostrarConfirmacion: boolean = false;

  public ventasFiltradas: Venta[] = [];

  public ventasAnuladas: Venta[] = [];

  public mostrarAnuladas: boolean = false; 

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

  public page: number = 1;
  public itemsPerPage: number = 20; 

  constructor(
    private ventaServicio_: VentasService,
    private detalleVentaService_: DetalleVentaServiceService,
    private articulosService_: ArticuloServiceService,
    private medioDePagoService_: MedioDePagoService,
    private localService_: LocalService
  ) { }

  ngOnInit() {
    this.obtenerMediosDePago();
    this.obtenerLocal();
    this.obtenerVentas();
    this.obtenerVentasAnuladas();
    
  }

  cerrarCanvas() {
    this.mostrarCanvas = false;
  }

  obtenerVentas() {
    this.ventaServicio_.obtenerVentas().subscribe({
      next: (data) => {
        const mapeadas = data.map((venta) => ({
          ...venta,
          nombreMedioPago: this.obtenerNombreMedioPago(venta.idMedioDePago),
          nombreLocal: this.obtenerNombreLocal(venta.local.id) 
        }));
        this.ventas = mapeadas;
        this.ventasFiltradas = mapeadas;

        this.ventas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

      },
      error: (error) => {
        console.log('Se produjo un error al recibir las ventas: ', error);
      }
    });
  }

  obtenerVentasAnuladas() {
    this.ventaServicio_.obtenerVentaAnuladas().subscribe({
      next: (data) => {
        const mapeadas = data.map((venta) => ({
          ...venta,
          nombreMedioPago: this.obtenerNombreMedioPago(venta.idMedioDePago),
          nombreLocal: this.obtenerNombreLocal(venta.local.id)
        }));
        this.ventasAnuladas = mapeadas;
        this.ventasFiltradas = mapeadas
        

        this.ventasAnuladas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      },
      error: (error) => {
        console.error('❌ Error al obtener ventas anuladas:', error);
      }
    });
  }

  alternarVentas() {
    this.mostrarAnuladas = !this.mostrarAnuladas;
    this.filtrarVentas();
    if (this.mostrarAnuladas) {
      this.ventasFiltradas = this.ventasAnuladas; 
    } else {
      this.ventasFiltradas = this.ventas;  
    }
  }

  obtenerMediosDePago() {
    this.medioDePagoService_.obtenerTodosLosMediosDePagoEInactivos().subscribe({
      next: (data) => {
        this.mediosDePago = data;
      },
      error: (error) => {
        console.error('❌ Error al obtener medios de pago:', error);
      }
    });
  }

  obtenerLocal() {
    this.localService_.obtenerLocales().subscribe({
      next: (data) => {
        this.local = data;
      },
      error: (error) => {
        console.error('❌ Error al obtener los locales:', error);
      }
    });
  }

  obtenerNombreLocal(idLocal: number): string {
    const loc = this.local.find(m => m.id === idLocal);
    return loc ? loc.nombre : 'Desconocido';
  }

  obtenerNombreMedioPago(idMedioPago: number): string {
    const medio = this.mediosDePago.find(m => m.id === idMedioPago);
    return medio ? medio.nombre : 'Desconocido';
  }

  filtrarVentas() {
    const ventasBase = this.mostrarAnuladas ? this.ventasAnuladas : this.ventas;

    this.ventasFiltradas = ventasBase.filter((venta) => {
      const fechaVenta = new Date(venta.fecha);
      fechaVenta.setHours(fechaVenta.getHours() - 3); 

      const fechaFiltro = this.filtros.fecha ? new Date(this.filtros.fecha + 'T00:00:00') : null;

      return (
        (!fechaFiltro ||
          (fechaVenta.getFullYear() === fechaFiltro.getFullYear() &&
            fechaVenta.getMonth() === fechaFiltro.getMonth() &&
            fechaVenta.getDate() === fechaFiltro.getDate())) &&
        (!this.filtros.local || venta.local.id === +this.filtros.local) &&
        (!this.filtros.medioPago || venta.idMedioDePago === +this.filtros.medioPago) &&  
        (!this.filtros.montoMin || venta.total >= this.filtros.montoMin) &&
        (!this.filtros.montoMax || venta.total <= this.filtros.montoMax) &&
        (!this.filtros.numeroVenta || `${venta.id}`.includes(`${this.filtros.numeroVenta}`))
      );
    });

    this.ventasFiltradas.forEach(venta => {
      venta.nombreMedioPago=this.obtenerNombreMedioPago(venta.idMedioDePago),
      venta.nombreLocal=this.obtenerNombreLocal(venta.local.id)
    });

    this.ventasFiltradas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  }



  limpiarFiltros() {
    this.filtros = { fecha: '', local: '', medioPago: '', montoMin: null, montoMax: null, numeroVenta: null };
    this.filtrarVentas();
  }

  BajaVenta(venta: Venta) {
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
          this.ventaServicio_.BajaVenta(venta.id).subscribe({
          next: (mensaje) => {
          Swal.fire({
            title: 'Venta Anulada',
            text: 'La venta se ha anulado correctamente.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
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
              this.obtenerVentasAnuladas();
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

  generarPdfXubio() {
    const fechaFiltro = this.filtros.fecha ? new Date(this.filtros.fecha + 'T00:00:00') : null;
    const localFiltro = this.filtros.local ? parseInt(this.filtros.local, 10) : null;

    if (!fechaFiltro && !localFiltro) {
      Swal.fire('Debe seleccionar al menos una fecha o un local para generar el PDF', '', 'warning');
      return;
    }

    const ventasFiltradas = this.ventas.filter(venta => {
      const fechaVenta = new Date(venta.fecha);
      fechaVenta.setHours(fechaVenta.getHours() - 3); // Ajusta a UTC-3

      const coincideFecha = fechaFiltro ? (
        fechaVenta.getFullYear() === fechaFiltro.getFullYear() &&
        fechaVenta.getMonth() === fechaFiltro.getMonth() &&
        fechaVenta.getDate() === fechaFiltro.getDate()
      ) : true;

      const coincideLocal = localFiltro ? venta.local.id === localFiltro : true;

      return coincideFecha && coincideLocal;
    });

    if (ventasFiltradas.length === 0) {
      Swal.fire('No hay ventas para los filtros seleccionados', '', 'info');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text('Reporte  de Ventas', 14, 20);

    const fechaHoy = new Date().toLocaleDateString();
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(fechaHoy);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(fechaHoy, pageWidth - textWidth - 14, 20);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text('Carga de datos para Xubio', 14, 26);

    const fechaTexto = fechaFiltro ? fechaFiltro.toLocaleDateString() : 'Todas';
    const localTexto = localFiltro ? this.obtenerNombreLocal(localFiltro) : 'Todos';

    doc.setFontSize(13);
    doc.text(`Fecha filtrada: ${fechaTexto}`, 14, 38);

    if (localTexto != 'Todos') {
      doc.text(`Local: ${localTexto}`, 14, 43);
    }
    
    let currentY = 52;

    const ventas = [...ventasFiltradas];

    const promesas = ventas.map(venta =>
      this.detalleVentaService_.getDetalleVentaPorIdVenta(venta.id).toPromise()
        .then(detalles => ({ venta, detalles: detalles as DetalleVenta[] }))
    );

    Promise.all(promesas).then(async resultados => {
      const agrupadoPorMedio: { [medio: string]: DetalleVenta[] } = {};
      const articuloIds: Set<number> = new Set();

      resultados.forEach(({ venta, detalles }) => {
        const medio = venta.nombreMedioPago || 'Desconocido';
        if (!agrupadoPorMedio[medio]) agrupadoPorMedio[medio] = [];
        agrupadoPorMedio[medio].push(...detalles);

        detalles.forEach(det => articuloIds.add(det.idArticulo));
      });

      const nombreArticulos: { [id: number]: string } = {};
      const idArray = Array.from(articuloIds);

      await Promise.all(
        idArray.map(id =>
          this.articulosService_.getArticuloPorId(id).toPromise()
            .then(articulos => {
              if (articulos && articulos.length > 0) {
                nombreArticulos[id] = articulos[0].nombre;
              } else {
                nombreArticulos[id] = `Artículo ${id}`;
              }
            })
        )
      );

      if (!localFiltro) {
        // Agrupar por local y medio
        const agrupadoPorLocal: { [localId: number]: { nombre: string, medios: { [medio: string]: DetalleVenta[] } } } = {};

        resultados.forEach(({ venta, detalles }) => {
          const localId = venta.local.id;
          const nombreLocal = this.obtenerNombreLocal(localId)
          const medio = venta.nombreMedioPago || 'Desconocido';

          if (!agrupadoPorLocal[localId]) {
            agrupadoPorLocal[localId] = { nombre: nombreLocal, medios: {} };
          }

          if (!agrupadoPorLocal[localId].medios[medio]) {
            agrupadoPorLocal[localId].medios[medio] = [];
          }

          agrupadoPorLocal[localId].medios[medio].push(...detalles);
        });

        Object.entries(agrupadoPorLocal).forEach(([_, dataLocal]) => {
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");
          doc.text(`Local: ${dataLocal.nombre}`, 14, currentY);
          currentY += 6;

          Object.entries(dataLocal.medios).forEach(([medio, detalles]) => {
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text(`Medio de Pago: ${medio}`, 14, currentY);
            currentY += 5;
            doc.setFont("helvetica", "normal");

            autoTable(doc, {
              head: [['Artículo', 'Cantidad', 'Precio Unitario', 'Precio Total']],
              body: detalles.map((d: DetalleVenta) => [
                nombreArticulos[d.idArticulo] || `Artículo ${d.idArticulo}`,
                d.cantidad,
                `$${d.precioUnitario.toFixed(2)}`,
                `$${(d.precioVenta * d.cantidad).toFixed(2)}`
              ]),
              startY: currentY,
              styles: { fontSize: 10 },
              margin: { left: 14 },
              didDrawPage: (data: any) => {
                currentY = data.cursor.y + 5;
              }
            });

            currentY += 5;
          });

          currentY += 8; // Espacio entre locales
        });

      } else {
        // Solo agrupación por medio de pago
        Object.entries(agrupadoPorMedio).forEach(([medio, detalles]) => {
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");
          doc.text(`Medio de Pago: ${medio}`, 14, currentY);
          currentY += 6;
          doc.setFont("helvetica", "normal");

          autoTable(doc, {
            head: [['Artículo', 'Cantidad', 'Precio Unitario', 'Precio Total']],
            body: detalles.map((d: DetalleVenta) => [
              nombreArticulos[d.idArticulo] || `Artículo ${d.idArticulo}`,
              d.cantidad,
              `$${d.precioUnitario.toFixed(2)}`,
              `$${(d.precioVenta * d.cantidad).toFixed(2)}`
            ]),
            startY: currentY,
            styles: { fontSize: 10 },
            margin: { left: 14 },
            didDrawPage: (data: any) => {
              currentY = data.cursor.y + 5;
            }
          });

          currentY += 6;
        });
      }

      doc.save('reporte_ventas_detallado.pdf');
    });
  }






  generarPDF() {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Reporte de Ventas Filtradas', 14, 15);

    const columnas = ['N° Venta', 'Fecha', 'Local', 'Total', 'Medio de Pago'];
    const filas = this.ventasFiltradas.map(venta => [
      String(venta.id ?? ''),
      new Date(venta.fecha ?? '').toLocaleString(),
      String(venta.nombreLocal ?? ''),
      `$${(venta.total ?? 0).toFixed(2)}`,
      String(venta.nombreMedioPago ?? '')
    ]);

    const totalVentas = this.ventasFiltradas.reduce((sum, venta) => sum + (venta.total ?? 0), 0);

    const totalesPorMedio = this.ventasFiltradas.reduce((acc, venta) => {
      const medio = venta.nombreMedioPago ?? 'Desconocido';
      const total = venta.total ?? 0;

      if (!acc[medio]) {
        acc[medio] = 0;
      }
      acc[medio] += total;

      return acc;
    }, {} as { [medio: string]: number });

    autoTable(doc, {
      head: [columnas],
      body: filas,
      startY: 25,
      didDrawPage: (data) => {

        const y = data.cursor?.y ?? 0;
        let offsetY = y + 10;

        doc.setFontSize(12);
        doc.text('Totales por Medio de Pago:', 14, offsetY);
        offsetY += 6;

        for (const [medio, total] of Object.entries(totalesPorMedio)) {
          doc.text(`${medio}: $${total.toFixed(2)}`, 20, offsetY);
          offsetY += 6;
        }

        offsetY += 4;
        const totalGeneral = Object.values(totalesPorMedio).reduce((sum, val) => sum + val, 0);
        doc.setFont('helvetica', 'bold');
        doc.text(`Total general de ventas: $${totalGeneral.toFixed(2)}`, 14, offsetY);
        doc.setFont('helvetica', 'normal');
      }
    });

    doc.save('reporte_ventas.pdf');
  }

  



}
