import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../core/services/categoria.service';

@Component({
  selector: 'app-admin-configuracion-categorias',
  templateUrl: './admin-configuracion-categorias.component.html',
  styleUrl: './admin-configuracion-categorias.component.css'
})
export class AdminConfiguracionCategoriasComponent implements OnInit {
  nombresCategorias: string[] = [];
  nombresCategoriasFiltradas: string[] = [];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.obtenerCategorias().subscribe(categorias => {
      this.nombresCategorias = categorias.map(categoria => categoria.nombre);
      this.nombresCategoriasFiltradas = [...this.nombresCategorias];
    });
  }

  filtrarCategorias(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.toLowerCase();
    this.nombresCategoriasFiltradas = this.nombresCategorias.filter(nombre =>
      nombre.toLowerCase().includes(filtro)
    );
  }
}
