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
  nuevaCategoria: string = '';
  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.obtenerCategorias().subscribe(categorias => {
      this.nombresCategorias = categorias.map(categoria => categoria.nombre);
      this.nombresCategoriasFiltradas = [...this.nombresCategorias];
    });
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevaCategoria = '';
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
        this.nombresCategorias.push(categoria.nombre);
        this.nombresCategoriasFiltradas = [...this.nombresCategorias];
        this.cerrarModal();

        Swal.fire({
          icon: 'success',
          title: 'Categoría agregada',
          text: `La categoría "${categoria.nombre}" fue agregada exitosamente.`,
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true
        });
      },
      error: (err) => {
        console.error('Error al agregar categoría:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al guardar la categoría. Intentalo de nuevo.',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true
        });
      }
    });
  }
}
