import { Component } from '@angular/core';
import { PedidoService } from '../../../core/services/pedido.service';
import { PedidoDTO } from '../../../core/DTOs/pedido.dto';
import { LocalService } from '../../../core/services/local.service';
import { TipoPedidoService } from '../../../core/services/tipo-pedido.service';
import { Local } from '../../../core/models/local';
import { TipoPedido } from '../../../core/models/TipoPedido';
import { DetallePedidoDTO } from '../../../core/DTOs/detalle-pedido.dto';
import { FormsModule } from '@angular/forms';

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
  subtotal: number = 0;
  total: number = 0;

  userRole: number | null = null;
  filtroLocal: number | null = null;
  filtroTipoPedido: number | null = null;
  filtroEstado: string | null = null;
  constructor(private pedidoService: PedidoService, private localService: LocalService, private tipoPedidoService: TipoPedidoService) { }

  ngOnInit(): void {
    this.userRole = Number(localStorage.getItem('userRole'));
    this.cargarDatos();
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
    const localId = Number(localStorage.getItem('idLocal'));
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

        this.pedidos = pedidosFiltrados;
      },
      error: (error) => {
        console.error('Error al obtener los pedidos:', error);
      }
    });
  }



  verDetallePedido(idPedido?: number): void {

    if (!idPedido) return;

    const pedidoSeleccionado = this.pedidos.find(p => p.iD_Pedido === idPedido);

    if (pedidoSeleccionado && pedidoSeleccionado.detallePedido) {
      this.detallePedido = pedidoSeleccionado.detallePedido;
      this.mostrarCanvas = true;

      this.subtotal = this.detallePedido.reduce((acc, item) => acc + (item.precio_Unitario * item.cantidad), 0);
      this.total = this.subtotal;
    } else {
      console.warn('No se encontró el pedido o no tiene detalle.');
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

}
