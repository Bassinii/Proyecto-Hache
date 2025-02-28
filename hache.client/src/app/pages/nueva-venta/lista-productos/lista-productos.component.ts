import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../../core/models/articulo';
import { ArticuloServiceService } from '../../../core/services/articulo-service.service';
import { CarritoServiceService } from '../../../core/services/carrito-service.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent implements OnInit {
  articulos: Articulo[] = [];
  articulosFiltrados: Articulo[] = [];
  terminoBusqueda: string = '';
  constructor(private articuloService: ArticuloServiceService,private carritoService: CarritoServiceService) { }

  ngOnInit() {
    this.obtenerArticulos();
  }

  obtenerArticulos(): void {
    this.articuloService.getArticulos().subscribe({
      next: (data) => {
        this.articulos = data;
        this.articulosFiltrados = data; 
     
      },
      error: (error) => {
        console.error('Error al obtener los articulos:', error);
      }
    })
  }

  filtrarArticulos(): void {
    const termino = this.terminoBusqueda.toLowerCase();
    this.articulosFiltrados = this.articulos.filter(articulo =>
      articulo.nombre.toLowerCase().includes(termino)
    );
  }

  agregarAlCarrito(articulo: Articulo): void {
    this.carritoService.añadirAlCarrito(articulo);
    this.terminoBusqueda = '';
    this.articulosFiltrados = [...this.articulos];
    console.log('Producto agregado al carrito:', articulo);
  }

}
