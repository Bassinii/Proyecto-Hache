import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../core/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-configuracion-categorias',
  templateUrl: './admin-configuracion-categorias.component.html',
  styleUrl: './admin-configuracion-categorias.component.css'
})
export class AdminConfiguracionCategoriasComponent implements OnInit {
  nombresCategorias: string[] = [];
  nombresCategoriasFiltradas: string[] = [];

  mostrarModal: boolean = false;
  mostrarModalEliminar: boolean = false;

  nuevaCategoria: string = '';
  idSeleccionadoParaEliminar: number | null = null;

  listaCategorias: { id: number, nombre: string }[] = [];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.obtenerCategorias().subscribe(categorias => {
      this.listaCategorias = categorias;
      this.nombresCategorias = categorias.map(c => c.nombre);
      this.nombresCategoriasFiltradas = [...this.nombresCategorias];
    });
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevaCategoria = '';
  }

  cerrarModalEliminar() {
    this.mostrarModalEliminar = false;
    this.idSeleccionadoParaEliminar = null;
  }

  filtrarCategorias(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.toLowerCase();
    this.nombresCategoriasFiltradas = this.nombresCategorias.filter(nombre =>
      nombre.toLowerCase().includes(filtro)
    );
  }

  agregarCategoria() {
    const nombre = this.nuevaCategoria.trim();
    if (!nombre) return;

    this.categoriaService.agregarCategoria(nombre).subscribe({
      next: (categoria) => {
        this.cargarCategorias();
        this.cerrarModal();

        Swal.fire({
          icon: 'success',
          title: 'Categoría agregada',
          text: `La categoría "${categoria.nombre}" fue agregada exitosamente.`,
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al guardar la categoría.',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
    });
  }

  eliminarCategoria() {
    if (this.idSeleccionadoParaEliminar === null) return;

    this.categoriaService.bajaCategoria(this.idSeleccionadoParaEliminar).subscribe({
      next: () => {
        this.cargarCategorias();
        this.cerrarModalEliminar();

        Swal.fire({
          icon: 'success',
          title: 'Categoría eliminada',
          text: 'La categoría fue eliminada exitosamente.',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al eliminar la categoría.',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
    });
  }
}

