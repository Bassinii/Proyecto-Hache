import { Component,OnInit } from '@angular/core';
import { Articulo } from '../../../core/models/articulo';
import { ArticuloServiceService } from '../../../core/services/articulo-service.service';
import { CarritoServiceService } from '../../../core/services/carrito-service.service';
import { CategoriaService } from '../../../core/services/categoria.service';
import { StockServiceService } from '../../../core/services/stock-service.service';

@Component({
  selector: 'app-productos-lista',
  templateUrl: './productos-lista.component.html',
  styleUrl: './productos-lista.component.css'
})
export class ProductosListaComponent implements OnInit {

  articulos: Articulo[] = [];
  articulosFiltrados: Articulo[] = [];
  terminoBusqueda: string = '';
  categorias: { id: number, nombre: string }[] = [];
  categoriasSeleccionadas: number[] = [];

  ordenActual: string = "default";

  constructor(private articuloService: ArticuloServiceService,
    private carritoService: CarritoServiceService,
    private categoriaService: CategoriaService,
    private stockService: StockServiceService
  )
  { }

  ngOnInit() {
    //this.obtenerArticulos();
    this.obtenerArticulosConStock();
    this.obtenerCategorias();

    this.stockService.actualizarListadoArticulos$.subscribe(() => {
      this.obtenerArticulosConStock();
    });
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

  obtenerArticulosConStock(): void {
    const idLocal = Number(localStorage.getItem('idLocal'));

    this.stockService.getStocksLocal(idLocal).subscribe({
      next: (stocks) => {

        const stocksConCantidad = stocks.filter(s => s.cantidad > 0);

        const idsConStock = stocksConCantidad.map(s => s.iD_Articulo);

        this.articuloService.getArticulos().subscribe({
          next: (articulos) => {
           
            this.articulos = articulos.filter(a => idsConStock.includes(a.id));
            this.articulosFiltrados = [...this.articulos];
          },
          error: (error) => {
            console.error('Error al obtener los artículos:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error al obtener los stocks del local:', error);
      }
    });
  }


  obtenerCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (error) => console.error('Error al obtener las categorías:', error)
    });
  }

  filtrarArticulos(): void {
    const termino = this.terminoBusqueda.toLowerCase();

    this.articulosFiltrados = this.articulos.filter(articulo => {
      const coincideBusqueda = articulo.nombre.toLowerCase().includes(termino);
      const coincideCategoria = this.categoriasSeleccionadas.length === 0 || this.categoriasSeleccionadas.includes(articulo.categoria.id);

      return coincideBusqueda && coincideCategoria;
    });
  }


  ordenarPorPrecio(event: any) {
  this.ordenActual = event.target.value; 
  this.aplicarFiltros(); 
}

  filtrarPorCategoria(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.categoriasSeleccionadas = selectedValue === 'todas' ? [] : [parseInt(selectedValue, 10)];
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    const termino = this.terminoBusqueda.toLowerCase();

    // Filtro por búsqueda y categoría
    let articulosFiltrados = this.articulos.filter(articulo => {
      const coincideBusqueda = articulo.nombre.toLowerCase().includes(termino);
      const coincideCategoria = this.categoriasSeleccionadas.length === 0 || this.categoriasSeleccionadas.includes(articulo.categoria.id);
      return coincideBusqueda && coincideCategoria;
    });

    // Aplicar el orden seleccionado
    if (this.ordenActual === 'mayor') {
      articulosFiltrados.sort((a, b) => b.precio - a.precio);
    } else if (this.ordenActual === 'menor') {
      articulosFiltrados.sort((a, b) => a.precio - b.precio);
    }

    this.articulosFiltrados = articulosFiltrados;
  }

  agregarAlCarrito(articulo: Articulo): void {
    this.carritoService.añadirAlCarrito(articulo);
    
  }
}
