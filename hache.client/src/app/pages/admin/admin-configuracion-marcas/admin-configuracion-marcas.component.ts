import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../../../core/services/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-configuracion-marcas',
  templateUrl: './admin-configuracion-marcas.component.html',
  styleUrl: './admin-configuracion-marcas.component.css'
})
export class AdminConfiguracionMarcasComponent implements OnInit {
  nombresMarcas: string[] = [];
  nombresMarcasFiltradas: string[] = [];

  mostrarModal: boolean = false;
  nuevaMarca: string = '';

  mostrarModalEliminar: boolean = false;
  idSeleccionadoParaEliminar: number | null = null;

  listaMarcas: { id: number, nombre: string }[] = [];

  constructor(private marcaService: MarcaService) { }

  ngOnInit() {
    this.cargarMarcas();
  }

  cargarMarcas() {
    this.marcaService.obtenerMarcas().subscribe(marcas => {
      this.listaMarcas = marcas;
      this.nombresMarcas = marcas.map(m => m.nombre);
      this.nombresMarcasFiltradas = [...this.nombresMarcas];
    });
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevaMarca = '';
  }


  filtrarMarcas(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.toLowerCase();
    this.nombresMarcasFiltradas = this.nombresMarcas.filter(nombre =>
      nombre.toLowerCase().includes(filtro)
    );
  }

  agregarMarca() {
    const nombre = this.nuevaMarca.trim();
    if (!nombre) return;

    this.marcaService.agregarMarca(nombre).subscribe({
      next: (marca) => {
        this.nombresMarcas.push(marca.nombre);
        this.nombresMarcasFiltradas = [...this.nombresMarcas];
        this.cerrarModal();

        Swal.fire({
          icon: 'success',
          title: 'Marca agregada',
          text: `La marca "${marca.nombre}" fue agregada exitosamente.`,
          timer: 1000, 
          timerProgressBar: true,
          showConfirmButton: false
        });

      },
      error: (err) => {
        console.error('Error al agregar marca:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al guardar la marca. Intentalo de nuevo.',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
    });
  }

  cerrarModalEliminar() {
    this.mostrarModalEliminar = false;
    this.idSeleccionadoParaEliminar = null;
  }

  eliminarMarca() {
    if (this.idSeleccionadoParaEliminar === null) return;

    this.marcaService.bajaMarca(this.idSeleccionadoParaEliminar).subscribe({
      next: () => {
        this.cargarMarcas();
        this.cerrarModalEliminar();

        Swal.fire({
          icon: 'success',
          title: 'Marca eliminada',
          text: 'La marca fue eliminada exitosamente.',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      },
      error: (err) => {
        console.error('Error al eliminar marca:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al eliminar la marca. Intentalo de nuevo.',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
    });
  }


}
