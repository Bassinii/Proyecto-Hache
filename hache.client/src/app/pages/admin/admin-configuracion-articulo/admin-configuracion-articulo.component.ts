import { Component, OnInit } from '@angular/core';
import { ArticuloServiceService } from '../../../core/services/articulo-service.service';
import { Articulo } from '../../../core/models/articulo';

@Component({
  selector: 'app-admin-configuracion-articulo',
  templateUrl: './admin-configuracion-articulo.component.html',
  styleUrl: './admin-configuracion-articulo.component.css'
})
export class AdminConfiguracionArticuloComponent implements OnInit {
  nombresArticulos: string[] = [];
  nombresArticulosFiltrados: string[] = [];

  tamanoPagina: number = 10; // Tamaño inicial
  paginaActual: number = 1;
  constructor(private articuloService: ArticuloServiceService) { }

  ngOnInit() {
    this.cargarArticulos();
  }

  cargarArticulos() {
    this.articuloService.getArticulos().subscribe({
      next: (articulos: Articulo[]) => {
        this.nombresArticulos = articulos.map(a => a.nombre);
        this.nombresArticulosFiltrados = [...this.nombresArticulos]; // Inicializar filtrados
       
      },
      error: (error) => {
        console.error('Error al obtener los artículos:', error);
      }
    });
    
  }

  filtrarArticulos(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.toLowerCase();
    this.nombresArticulosFiltrados = this.nombresArticulos.filter(nombre =>
      nombre.toLowerCase().includes(filtro)
      
    );
    this.paginaActual = 1;
    
  }

  cambiarTamanoPagina(event: Event) {
    this.tamanoPagina = Number((event.target as HTMLSelectElement).value);
    this.paginaActual = 1; // Reiniciar a la primera página
  }

  obtenerPaginaActual(): string[] {
    const inicio = (this.paginaActual - 1) * this.tamanoPagina;
    return this.nombresArticulosFiltrados.slice(inicio, inicio + this.tamanoPagina);
  }

  get totalPaginas(): number {
    return Math.ceil(this.nombresArticulosFiltrados.length / this.tamanoPagina);
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }
  }

}
