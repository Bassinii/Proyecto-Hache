import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../../core/models/articulo';
import { ArticuloServiceService } from '../../../core/services/articulo-service.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit{
  articulos: Articulo[] = [];

  constructor(private articuloService_: ArticuloServiceService) { }

  ngOnInit() {
    this.obtenerArticulos();
  }

  obtenerArticulos() {
    this.articuloService_.getArticulos().subscribe({
      next: (data) => {
        this.articulos = data;
        console.log(this.articulos);
      },
      error: (error) => {
        console.error('Error al obtener los articulos:', error);
      }
    })
    this.articulos.sort((a, b) => a.categoria.id - b.categoria.id); //Ordena las categorias por id.

  }



}
