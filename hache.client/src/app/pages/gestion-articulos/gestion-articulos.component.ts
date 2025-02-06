import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../core/models/articulo';
import { ArticuloServiceService } from '../../core/services/articulo-service.service';
import { Categoria } from '../../core/models/categoria';

@Component({
  selector: 'app-gestion-articulos',
  templateUrl: './gestion-articulos.component.html',
  styleUrls: ['./gestion-articulos.component.css']
})
export class GestionArticulosComponent implements OnInit {
  categorias: Categoria[] = [];
  articulos: Articulo[] = [];

  constructor(private articuloService: ArticuloServiceService) { }

  ngOnInit(): void {
    this.getArticulos();
  }

  getArticulos() {
    this.articuloService.getArticulos().subscribe((data: Articulo[]) => {
      this.articulos = data;

      // Obtener categorías únicas
      this.categorias = [...new Set(data.map(a => a.categoria))];
    });
  }

  filtrarArticulosPorCategoria(idCategoria: number): Articulo[] {
    return this.articulos.filter(a => a.categoria.id === idCategoria);
  }
}
