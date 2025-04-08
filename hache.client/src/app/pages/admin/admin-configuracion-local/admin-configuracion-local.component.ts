import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../../core/services/local.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-configuracion-local',
  templateUrl: './admin-configuracion-local.component.html',
  styleUrl: './admin-configuracion-local.component.css'
})
export class AdminConfiguracionLocalComponent implements OnInit{

  nombresLocales: string[] = [];
  nombresLocalesFiltrados: string[] = [];

  mostrarModal: boolean = false;
  mostrarModalEliminar: boolean = false;

  nuevoLocal: string = '';

  idSeleccionadoParaEliminar: number | null = null;

  listaLocales: { id: number, nombre: string }[] = [];

  constructor(private localService: LocalService) { }

  ngOnInit() {

    this.cargarLocales();
  }

  cargarLocales() {
    this.localService.obtenerLocales().subscribe(locales => {
      this.listaLocales = locales;
      this.nombresLocales = locales.map(local => local.nombre);
      this.nombresLocalesFiltrados = [...this.nombresLocales];
    });
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevoLocal = '';
  }

  cerrarModalEliminar() {
    this.mostrarModalEliminar = false;
    this.idSeleccionadoParaEliminar = null;
  }

  filtrarLocales(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.toLowerCase();
    this.nombresLocalesFiltrados = this.nombresLocales.filter(nombre =>
      nombre.toLowerCase().includes(filtro)
    );
  }

  agregarLocal() {
    const nombre = this.nuevoLocal.trim();
    if (!nombre) return;

    this.localService.agregarlocal(nombre).subscribe({
      next: (local) => {
        this.cargarLocales();
        this.cerrarModal();

        Swal.fire({
          icon: 'success',
          title: 'Local agregado',
          text: `El local "${local.nombre}" fue agregado exitosamente.`,
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      },
      error: (err) => {
        console.error('Error al agregar local:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al guardar el local. Intentalo de nuevo.',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
    });
  }

  eliminarLocal() {
    if (this.idSeleccionadoParaEliminar === null) return;

    this.localService.bajaLocal(this.idSeleccionadoParaEliminar).subscribe({
      next: () => {
        this.cargarLocales();
        this.cerrarModalEliminar();

        Swal.fire({
          icon: 'success',
          title: 'Local eliminado',
          text: 'El local fue eliminado exitosamente.',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      },
      error: (err) => {
        console.error('Error al eliminar local:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al eliminar el local. Intentalo de nuevo.',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
    });
  }
}
