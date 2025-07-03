import { Component } from '@angular/core';
import { PedidoService } from '../../../core/services/pedido.service';
import { PedidoDTO } from '../../../core/DTOs/pedido.dto';
import { LocalService } from '../../../core/services/local.service';
import { TipoPedidoService } from '../../../core/services/tipo-pedido.service';
import { Local } from '../../../core/models/local';
import { TipoPedido } from '../../../core/models/TipoPedido';
import { DetallePedidoDTO } from '../../../core/DTOs/detalle-pedido.dto';
import { FormsModule } from '@angular/forms';
import { editarPedidoDTO } from '../../../core/DTOs/editarPedido.dto';
import Swal from 'sweetalert2';
import { DetallePedido } from '../../../core/models/detalle-pedido';
import { CategoriaService } from '../../../core/services/categoria.service';
import { Categoria } from '../../../core/models/categoria';
import { ArticuloServiceService } from '../../../core/services/articulo-service.service';
import { Articulo } from '../../../core/models/articulo';
import { DetallePedidoService } from '../../../core/services/detalle-pedido.service';
import { observacionUpdateDTO } from '../../../core/DTOs/observacionUpdate.dto';
import { jwtDecode } from 'jwt-decode';
import { Pedido } from '../../../core/models/pedido';

@Component({
  selector: 'app-pedidos-ver-pedidos',
  templateUrl: './pedidos-ver-pedidos.component.html',
  styleUrl: './pedidos-ver-pedidos.component.css'
})
export class PedidosVerPedidosComponent {

  pedidos: PedidoDTO[] = [];
  locales: Local[] = [];
  tiposDePedido: TipoPedido[] = [];

  mostrarCanvas: boolean = false;
  detallePedido: DetallePedidoDTO[] = [];
  detallePedidoOriginal: DetallePedidoDTO[] = [];
  subtotal: number = 0;
  total: number = 0;

  userRole: number | null = null;
  filtroLocal: number | null = null;
  filtroTipoPedido: number | null = null;
  filtroEstado: string | null = null;
  filtroFechaDesde: string | null = null;
  filtroFechaHasta: string | null = null;

  pedidoAEditar: PedidoDTO | null = null;
  pedidoOriginal: PedidoDTO | null = null;
  mostrarModalEdicion: boolean = false;

  pedidoAVer: PedidoDTO = {
    iD_Pedido: 0,
    iD_TipoPedido: 1,
    iD_Local: 1,
    estado: '',
    fecha: Date(),
    observacion: '',
    fechaEntrega: Date(),
    detallePedido: []
  };

  categorias: Categoria[] = [];
  categoriaSeleccionada: Categoria | null = null;
  busqueda: string = '';

  articulos: Articulo[] = [];
  articulosOriginales: Articulo[] = [];
  articulosFiltrados: Articulo[] = [];
  articulosSeleccionados: Articulo[] = [];

  mostrarDropdown: boolean = false;

  mostrarModalDetalle: boolean = false;
  observacion: string = '';

  nombreArticulo: string | null = null;


  public page: number = 1;
  public itemsPerPage: number = 20; 

  constructor(private pedidoService: PedidoService,
    private localService: LocalService,
    private tipoPedidoService: TipoPedidoService,
    private categoriaService: CategoriaService,
    private articuloService: ArticuloServiceService,
    private detallePedidoService: DetallePedidoService

  ) { }

  ngOnInit(): void {

    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token no encontrado.');
      return;
    }
    try {
      const decodedToken: any = jwtDecode(token);
      this.userRole = Number(decodedToken['userRole']);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return;
    }

    this.cargarDatos();
    this.obtenerArticulos();
  }

  obtenerArticulos() {
    this.articuloService.getArticulos().subscribe({
      next: (data) => {
        this.articulos = data;
      },
      error: (error) => {
        console.error('Error al obtener los articulos:', error);
      }
    });
  }

  cargarDatos(): void {
    this.localService.obtenerLocales().subscribe({
      next: (locales) => {
        this.locales = locales;
        this.tipoPedidoService.obtenerTiposDePedido().subscribe({
          next: (tipos) => {
            this.tiposDePedido = tipos;
            this.obtenerPedidos();
          },
          error: (error) => {
            console.error('Error al obtener tipos de pedido:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error al obtener locales:', error);
      }
    });
  }

  obtenerPedidos(): void {
    let localId: number;
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token no encontrado.');
      return;
    }
    try {
      const decodedToken: any = jwtDecode(token);
      localId = Number(decodedToken['ID_Local']);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return;
    }

    if (!localId) return;

    this.pedidoService.obtenerPedidos().subscribe({
      next: (data) => {
        let pedidosFiltrados = data;

        if (this.userRole === 2 && localId) {
          pedidosFiltrados = pedidosFiltrados.filter(pedido => pedido.iD_Local === localId);
        }

        if (this.filtroLocal !== null) {
          pedidosFiltrados = pedidosFiltrados.filter(pedido => pedido.iD_Local === Number(this.filtroLocal));
        }

        if (this.filtroTipoPedido !== null) {
          pedidosFiltrados = pedidosFiltrados.filter(pedido => pedido.iD_TipoPedido === Number(this.filtroTipoPedido));
        }

        if (this.filtroEstado !== null && this.filtroEstado !== '') {
          pedidosFiltrados = pedidosFiltrados.filter(p => p.estado === this.filtroEstado);
        }

        if (this.filtroFechaDesde) {
          const fechaDesde = new Date(this.filtroFechaDesde);
          pedidosFiltrados = pedidosFiltrados.filter(p => new Date(p.fecha) >= fechaDesde);
        }

        if (this.filtroFechaHasta) {
          const fechaHasta = new Date(this.filtroFechaHasta);
          fechaHasta.setDate(fechaHasta.getDate() + 1);
          pedidosFiltrados = pedidosFiltrados.filter(p => new Date(p.fecha) < fechaHasta);
        }

        this.pedidos = pedidosFiltrados.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        this.pedidos = pedidosFiltrados;
      },
      error: (error) => {
        console.error('Error al obtener los pedidos:', error);
        console.log('Detalles:', error.error);
      }
    });
  }


  verDetallePedido(idPedido?: number): void {
    let pedido: PedidoDTO;
    if (!idPedido) return;

    this.pedidoService.obtenerPedidoPorID(idPedido).subscribe({
      next: (data) => {
        console.log('DATA: ', data);
        pedido = data;
        this.tipoPedidoService.obtenerTipoPedidoPorId(pedido.iD_TipoPedido).subscribe({
          next: (data) => {
            pedido.nombreTipoPedido = data.nombre;
          },
          error: (error) => {
            console.error('Error al obtener nombre del tipo de pedido: ', error);
          }
        })
        pedido.detallePedido.forEach((detalle) => {
          this.articuloService.getArticuloPorId(detalle.iD_Articulo).subscribe({
            next: (data) => {
              detalle.imagen = data[0].imagen;
              detalle.nombreArticulo = data[0].nombre;
              console.log('Pedido: ', pedido);
              this.pedidoAVer = pedido;
            },
            error: (error) => {
              console.error('Error al obtener articulo del detalle pedido: ', error);
            }
          })
        })

      },
      error: (error) => {
        console.error('Error al obtener pedido por id', error);
      }
    })
  }


  abrirModalEdicion(pedido: PedidoDTO): void {
    this.pedidoAEditar = { ...pedido };
    this.pedidoOriginal = { ...pedido };
    this.mostrarModalEdicion = true;
  }

  cerrarModal(): void {
    this.mostrarModalEdicion = false;
    this.pedidoAEditar = null;
  }

  guardarCambiosPedido(): void {
    if (!this.pedidoAEditar || this.pedidoAEditar.iD_Pedido == null) return;

    const Cambios =
      this.pedidoAEditar.estado !== this.pedidoOriginal?.estado ||
      this.pedidoAEditar.fechaEntrega !== this.pedidoOriginal?.fechaEntrega;

    if (!Cambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No realizaste ningún cambio en el pedido.',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
      return;
    }
    if (this.pedidoAEditar.fechaEntrega == null && this.pedidoAEditar.estado == 'Entregado') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ingrese la fecha de entrega para poder actualizar el pedido.',
      });
      return;
    }
    const dto: editarPedidoDTO = {
      estado: this.pedidoAEditar.estado,
      fecha_Entrega: this.pedidoAEditar.fechaEntrega ?? undefined

    };

    this.pedidoService.editarPedido(this.pedidoAEditar.iD_Pedido, dto).subscribe({
      next: () => {
        this.obtenerPedidos(); 
        this.cerrarModal();
        this.observacion = '';
        Swal.fire({
          icon: 'success',
          title: '¡Pedido actualizado!',
          text: 'El pedido se actualizo con éxito.',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });

      },
      error: (err) => {
        console.error('Error al editar el pedido:', err);
        console.log('Detalles:', err.error);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al actualizar el pedido. Intente nuevamente.'
        });
      }
    });
  }

  getEstadoClase(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'pendiente':
        return 'text-yellow-600';
      case 'aceptado':
        return 'text-blue-600';
      case 'entregado':
        return 'text-green-600';
      case 'cancelado':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }

  obtenerNombreLocal(id: number): string {
    const local = this.locales.find(l => l.id === id);
    return local ? local.nombre : 'Desconocido';
  }

  obtenerNombreTipoPedido(id: number): string {
    const tipo = this.tiposDePedido.find(t => t.iD_TipoPedido === id);
    return tipo ? tipo.nombre : 'Desconocido';
  }

  cerrarModalDetalle(): void {
    this.mostrarModalDetalle = false;
    this.pedidoAEditar = null;
  }

  observacionPedido: string = '';
  observacionOriginal: string = '';
  
  verDetallePedidoModal(idPedido?: number): void {

    if (!idPedido) return;

    const pedidoSeleccionado = this.pedidos.find(p => p.iD_Pedido === idPedido);

    if (pedidoSeleccionado && pedidoSeleccionado.detallePedido) {
      this.detallePedido = pedidoSeleccionado.detallePedido;
      this.detallePedidoOriginal = JSON.parse(JSON.stringify(pedidoSeleccionado.detallePedido)); 
      this.cargarCategorias(idPedido);
      this.mostrarModalDetalle = true;
      this.pedidoAEditar = { ...pedidoSeleccionado };
      this.pedidoOriginal = { ...pedidoSeleccionado };

      this.subtotal = this.detallePedido.reduce((acc, item) => acc + (item.precio_Unitario * item.cantidad), 0);
      this.total = this.subtotal;

      this.pedidoService.obtenerObservacion(idPedido).subscribe({
        next: (obs) => {
          this.observacionPedido = obs;
          this.observacionOriginal = obs; 
        },
        error: (err) => {
          console.error('Error al obtener observación', err);
          this.observacionPedido = 'No se pudo cargar la observación.';
          this.observacionOriginal = ''; 
        }
      });

    } else {
      console.warn('No se encontró el pedido o no tiene detalle.');
      Swal.fire({
        icon: 'warning',
        title: 'Error al listar detalle',
        text: 'No se encontró el pedido o no tiene detalle.',
        timer: 200,
        showConfirmButton: false
      });
    }
  }

  obtenerNombreArticulo(id: number): string {
    const articulo = this.articulos.find(a => a.id === id);
    return articulo ? articulo.nombre : 'Artículo desconocido';
  }


  cargarCategorias(idPedido: number) {
    const pedido = this.pedidos.find(p => p.iD_Pedido === idPedido);
    if (!pedido) return;

    this.categoriaService.obtenerCategoriasPorTipoPedido(pedido.iD_TipoPedido)
      .subscribe(cats => {
        this.categorias = cats;
      });
  }


  onCategoriaSeleccionada(): void {
    if (this.categoriaSeleccionada) {
      this.articuloService.getArticulosPorCategoria(this.categoriaSeleccionada.id)
        .subscribe(articulos => {
          this.articulosOriginales = articulos;
          this.filtrarArticulos();
          this.mostrarDropdown = false;
        });
    } else {
      this.articulosOriginales = [];
      this.articulosFiltrados = [];
      this.mostrarDropdown = false;
    }
  }

  filtrarArticulos(): void {
    const termino = this.busqueda.trim().toLowerCase();
    if (termino === '') {
      this.articulosFiltrados = [...this.articulosOriginales];
    } else {
      this.articulosFiltrados = this.articulosOriginales.filter(a =>
        a.nombre.toLowerCase().includes(termino)
      );
    }
  }

  seleccionarArticuloDesdeDropdown(articulo: Articulo): void {
    this.agregarArticulo(articulo);
    this.busqueda = '';
    this.mostrarDropdown = false;
  }

  agregarArticulo(articulo: Articulo): void {

    if (!this.pedidoAEditar?.iD_Pedido) {
      console.error('No hay un pedido válido para agregar el artículo.');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede agregar un artículo sin un pedido válido.',
      });
      return;
    }

    const yaExiste = this.detallePedido.some(d => d.iD_Articulo === articulo.id);

    if (yaExiste) {
      Swal.fire({
        icon: 'warning',
        title: 'Artículo duplicado',
        text: 'Este artículo ya fue agregado al detalle.',
        timer: 2000,
        showConfirmButton: false,
        
      });
      return;
    }
    const nuevoDetalle: DetallePedidoDTO = {
      iD_Pedido: this.pedidoAEditar.iD_Pedido,
      iD_Articulo: articulo.id,
      cantidad: 1,
      precio_Unitario: articulo.precio,
    };
    this.detallePedido.push(nuevoDetalle);
  }

  eliminarArticulo(iD_Articulo: number): void {
    this.detallePedido = this.detallePedido.filter(item => item.iD_Articulo !== iD_Articulo);
  }

  ocultarDropdown(): void {
    this.mostrarDropdown = false
  }

  trackByArticulo(index: number, item: DetallePedidoDTO): number {
    return item.iD_Articulo;
  }

  guardarEdicionPedido(): void {
    if (!this.pedidoAEditar || !this.pedidoAEditar.iD_Pedido) {
      return;
    }

    const detallesActualizados: DetallePedidoDTO[] = this.detallePedido;
    const idPedido = this.pedidoAEditar.iD_Pedido;
    let huboCambios = false;

    // Verificar si hubo cambios en la observación
    if (this.observacionPedido !== this.observacionOriginal) {
      const obsDto: observacionUpdateDTO = {
        idPedido: idPedido,
        observacion: this.observacionPedido
      };

      this.pedidoService.editarObservacion(obsDto).subscribe({
        next: () => {
          this.obtenerPedidos();
          console.log('Observación actualizada.');
        },
        error: (err) => {
          console.error('Error al actualizar observación:', err);
        }
      });

      huboCambios = true;
    }

    // Verificar si los detalles han cambiado
    const detallesNoModificados = JSON.stringify(detallesActualizados) === JSON.stringify(this.detallePedidoOriginal);

    if (!detallesNoModificados) {
      this.detallePedidoService.editarDetallePedido(idPedido, detallesActualizados).subscribe({
        next: () => {
          this.obtenerPedidos();
          this.cerrarModalDetalle();
          Swal.fire({
            icon: 'success',
            title: '¡Pedido actualizado!',
            text: 'El detalle del pedido se editó con éxito.',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
          });
        },
        error: (err) => {
          this.cerrarModalDetalle();
          console.error('Error al actualizar el detalle del pedido:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al actualizar el detalle del pedido. Intente nuevamente.'
          });
        }
      });

      huboCambios = true;
    }

    // Si no hubo cambios, mostrar mensaje informativo
    if (!huboCambios) {
      this.cerrarModalDetalle();
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No se realizaron cambios en el pedido.',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    }
  }

}
