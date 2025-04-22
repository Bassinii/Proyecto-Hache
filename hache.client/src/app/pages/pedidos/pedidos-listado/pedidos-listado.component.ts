import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoPedido } from '../../../core/models/TipoPedido';
import { TipoPedidoService } from '../../../core/services/tipo-pedido.service';

@Component({
  selector: 'app-pedidos-listado',
  templateUrl: './pedidos-listado.component.html',
  styleUrl: './pedidos-listado.component.css'
})
export class PedidosListadoComponent implements OnInit {

  pedidos: TipoPedido[] = [];

  constructor(private tipoPedidoService: TipoPedidoService, private router: Router) { }

  ngOnInit(): void {
    this.tipoPedidoService.obtenerTiposDePedido().subscribe((tipos: TipoPedido[]) => {
      this.pedidos = tipos.map(tp => ({
        ...tp,
        dia: this.obtenerDiaPorTipo(tp.nombre)
      }));
    });
  }

  obtenerDiaPorTipo(nombre: string): string {
    switch (nombre.toLowerCase()) {
      case 'panes': return 'Todos los días';
      case 'elaboración propia': return 'Miércoles - Sábados';
      case 'productos de terceros':
      case 'medialunas':
      case 'rochino': return 'Sábados';
      default: return '';
    }
  }

  PedidosRealizar(idTipoPedido: number, nombrepedido: string) {
    this.router.navigate(['/pedidos/pedidos-realizar', idTipoPedido,nombrepedido]);
  }
}
