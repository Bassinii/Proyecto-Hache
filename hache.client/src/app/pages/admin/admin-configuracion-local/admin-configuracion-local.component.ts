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
  nuevoLocal: string = '';
  constructor(private localService: LocalService) { }

  ngOnInit() {
    this.localService.obtenerLocales().subscribe(locales => {
      this.nombresLocales = locales.map(local => local.nombre);
      this.nombresLocalesFiltrados = [...this.nombresLocales];
    });
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevoLocal = '';
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
        this.nombresLocales.push(local.nombre);
        this.nombresLocalesFiltrados = [...this.nombresLocales];
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

}
