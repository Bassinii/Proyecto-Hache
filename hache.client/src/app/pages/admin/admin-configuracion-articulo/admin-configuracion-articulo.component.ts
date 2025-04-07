import { Component, OnInit } from '@angular/core';
import { ArticuloServiceService } from '../../../core/services/articulo-service.service';
import { Articulo } from '../../../core/models/articulo';
import { CategoriaService } from '../../../core/services/categoria.service';
import { MarcaService } from '../../../core/services/marca.service';
import { Categoria } from '../../../core/models/categoria';
import { Marca } from '../../../core/models/marca';
import { ArticuloDTO } from '../../../core/DTOs/ArticuloDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-configuracion-articulo',
  templateUrl: './admin-configuracion-articulo.component.html',
  styleUrl: './admin-configuracion-articulo.component.css'
})
export class AdminConfiguracionArticuloComponent implements OnInit {
  nombresArticulos: string[] = [];
  nombresArticulosFiltrados: string[] = [];

  categorias: Categoria[] = [];
  marcas: Marca[] = [];

  tamanoPagina: number = 10; // Tamaño inicial
  paginaActual: number = 1;

  formularioArticulo: ArticuloDTO = {
    nombre: '',
    precio: 0,
    marca: { id: 0, nombre: '' },
    categoria: { id: 0, nombre: '' }
  };

  mostrarModal: boolean = false;
  constructor(private articuloService: ArticuloServiceService, private categoriaService: CategoriaService, private marcaService: MarcaService) { }

  ngOnInit() {
    this.cargarArticulos();

    this.categoriaService.obtenerCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (err) => {
        console.error("Error al obtener categorías", err);
      }
    });

    this.marcaService.obtenerMarcas().subscribe({
      next: (marcas) => {
        this.marcas = marcas;
      },
      error: (err) => {
        console.error("Error al obtener marcas", err);
      }
    });
  }

  agregarArticulo() {
    const { nombre, precio, marca, categoria } = this.formularioArticulo;

    // Validaciones
    if (!nombre.trim() || precio <= 0 || !marca?.id || !categoria?.id) {
      Swal.fire({
        icon: 'warning',
        title: 'Datos incompletos',
        text: 'Por favor completá todos los campos y asegurate de que el precio sea mayor a cero.',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    this.articuloService.agregarArticulo(this.formularioArticulo).subscribe({
      next: (resp) => {
        console.log('Artículo agregado correctamente', resp);
        this.cargarArticulos();

        Swal.fire({
          icon: 'success',
          title: 'Articulo agregado',
          text: `El artículo "${this.formularioArticulo.nombre}" fue agregado exitosamente.`,
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true
        });

        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error al agregar el artículo:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al agregar el artículo. Intentalo de nuevo.',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true
        });
      }
    });
  }


  cerrarModal() {
    this.mostrarModal = false;
    this.formularioArticulo = {
      nombre: '',
      precio: 0,
      marca: { id: 0, nombre: '' },
      categoria: { id: 0, nombre: '' }
    };
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
