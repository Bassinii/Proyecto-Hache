import { Component, OnInit } from '@angular/core';
import { ArticuloServiceService } from '../../../core/services/articulo-service.service';
import { Articulo } from '../../../core/models/articulo';
import { CategoriaService } from '../../../core/services/categoria.service';
import { MarcaService } from '../../../core/services/marca.service';
import { Categoria } from '../../../core/models/categoria';
import { Marca } from '../../../core/models/marca';
import { ArticuloDTO } from '../../../core/DTOs/articulo.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-configuracion-articulo',
  templateUrl: './admin-configuracion-articulo.component.html',
  styleUrl: './admin-configuracion-articulo.component.css'
})
export class AdminConfiguracionArticuloComponent implements OnInit {
  listaArticulos: { id: number, nombre: string }[] = [];
  nombresArticulosFiltrados: string[] = [];

  categorias: Categoria[] = [];
  marcas: Marca[] = [];

  tamanoPagina: number = 10;
  paginaActual: number = 1;

  formularioArticulo: ArticuloDTO = {
    nombre: '',
    precio: 0,
    codigoXubio: '',
    marca: { id: 0, nombre: '' },
    categoria: { id: 0, nombre: '' }
  };

  mostrarModalEliminar: boolean = false;
  idSeleccionadoParaEliminar: number | null = null;

  mostrarModal: boolean = false;

  mostrarModalImagen: boolean = false;

  articuloSeleccionadoParaImagen: { id: number, nombre: string } | null = null;
  filtroModalImagen: string = '';
  articulosFiltradosModalImagen: { id: number, nombre: string }[] = [];

  archivoSeleccionado: File | null = null;
  nombreArchivo: string = '';
  constructor(
    private articuloService: ArticuloServiceService,
    private categoriaService: CategoriaService,
    private marcaService: MarcaService
  ) { }

  ngOnInit() {
    this.cargarArticulos();

    this.categoriaService.obtenerCategorias().subscribe({
      next: (categorias) => this.categorias = categorias,
      error: (err) => console.error("Error al obtener categorías", err)
    });

    this.marcaService.obtenerMarcas().subscribe({
      next: (marcas) => this.marcas = marcas,
      error: (err) => console.error("Error al obtener marcas", err)
    });
  }

  cargarArticulos() {
    this.articuloService.getArticulos().subscribe({
      next: (articulos: Articulo[]) => {
        this.listaArticulos = articulos.map(a => ({ id: a.id, nombre: a.nombre }));
        this.nombresArticulosFiltrados = [...this.listaArticulos.map(a => a.nombre)];
        this.articulosFiltradosModalImagen = [...this.listaArticulos];
      },
      error: (error) => console.error('Error al obtener los artículos:', error)
    });
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.formularioArticulo = {
      nombre: '',
      codigoXubio: '',
      precio: 0,
      marca: { id: 0, nombre: '' },
      categoria: { id: 0, nombre: '' }
    };
  }

  cerrarModalEliminar() {
    this.mostrarModalEliminar = false;
    this.idSeleccionadoParaEliminar = null;
  }

  cerrarModalImagen() {
    this.mostrarModalImagen = false;

  }

  filtrarArticulos(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.toLowerCase();
    this.nombresArticulosFiltrados = this.listaArticulos
      .filter(a => a.nombre.toLowerCase().includes(filtro))
      .map(a => a.nombre);
    this.paginaActual = 1;
  }

  filtrarEnModalImagen() {
    const filtro = this.filtroModalImagen.toLowerCase();
    this.articulosFiltradosModalImagen = this.listaArticulos.filter(a =>
      a.nombre.toLowerCase().includes(filtro)
    );
  }

  seleccionarArticuloParaImagen(articulo: { id: number, nombre: string }) {
    this.articuloSeleccionadoParaImagen = articulo;
  }

  abrirSelectorArchivo() {
    const inputFile = document.getElementById('fileInput') as HTMLInputElement;
    inputFile.click();
  }

  onArchivoSeleccionado(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoSeleccionado = input.files[0];
      this.nombreArchivo = this.archivoSeleccionado.name;
    } else {
      this.nombreArchivo = '';
      this.archivoSeleccionado = null;
    }
  }

  agregarArticulo() {
    const { nombre, precio, marca, categoria } = this.formularioArticulo;

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
        this.cargarArticulos();
        Swal.fire({
          icon: 'success',
          title: 'Artículo agregado',
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

  eliminarArticulo() {
    if (this.idSeleccionadoParaEliminar === null) return;

    this.articuloService.BajaArticulo(this.idSeleccionadoParaEliminar).subscribe({
      next: () => {
        this.cargarArticulos();
        this.cerrarModalEliminar();
        Swal.fire({
          icon: 'success',
          title: 'Artículo eliminado',
          text: 'El artículo fue eliminado exitosamente.',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      },
      error: (err) => {
        console.error('Error al eliminar artículo:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al eliminar el artículo. Intentalo de nuevo.',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
    });
  }


  guardarImagen() {
    if (!this.articuloSeleccionadoParaImagen) {
      Swal.fire('Error', 'Debes seleccionar un artículo.', 'error');
      return;
    }
    if (!this.archivoSeleccionado) {
      Swal.fire('Error', 'Debes seleccionar un archivo de imagen.', 'error');
      return;
    }

    this.articuloService.subirImagen(this.archivoSeleccionado, this.articuloSeleccionadoParaImagen.id)
      .subscribe({
        next: () => {
          Swal.fire('¡Imagen guardada!', 'La imagen se subió correctamente.', 'success');
          this.cerrarModalImagen();
          this.archivoSeleccionado = null;
          const inputFile = document.getElementById('fileInput') as HTMLInputElement;
          if (inputFile) {
            inputFile.value = '';
          }
          this.nombreArchivo = '';
          this.articuloSeleccionadoParaImagen = null;
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error', 'Hubo un problema al subir la imagen.', 'error');
        }
      });
  }



  cambiarTamanoPagina(event: Event) {
    this.tamanoPagina = Number((event.target as HTMLSelectElement).value);
    this.paginaActual = 1;
  }

  obtenerPaginaActual(): string[] {
    const inicio = (this.paginaActual - 1) * this.tamanoPagina;
    return this.nombresArticulosFiltrados.slice(inicio, inicio + this.tamanoPagina);
  }

  get totalPaginas(): number {
    return Math.ceil(this.nombresArticulosFiltrados.length / this.tamanoPagina);
  }

  paginaAnterior() {
    if (this.paginaActual > 1) this.paginaActual--;
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) this.paginaActual++;
  }
}
