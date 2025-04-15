import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../../../core/models/categoria';
import { TipoPedidoService } from '../../../core/services/tipo-pedido.service';
import { CategoriaService } from '../../../core/services/categoria.service';

@Component({
  selector: 'app-pedidos-realizar',
  templateUrl: './pedidos-realizar.component.html',
  styleUrl: './pedidos-realizar.component.css'
})
export class PedidosRealizarComponent {

  categorias: Categoria[] = [];
  idTipoPedido: number = 0;

  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('ID recibido:', id); 
      if (id) {
        this.idTipoPedido = +id;
        this.cargarCategorias();
      }
    });
  }

  cargarCategorias() {
    this.categoriaService.obtenerCategoriasPorTipoPedido(this.idTipoPedido)
      .subscribe(cats => {
        this.categorias = cats;
        console.log('Categorias cargadas:', this.categorias);
      });
  }
}
