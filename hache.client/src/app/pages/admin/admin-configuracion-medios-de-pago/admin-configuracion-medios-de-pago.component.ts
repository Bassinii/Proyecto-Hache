import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { MedioDePagoService } from '../../../core/services/medio-de-pago.service';

@Component({
  selector: 'app-admin-configuracion-medios-de-pago',
  templateUrl: './admin-configuracion-medios-de-pago.component.html',
  styleUrl: './admin-configuracion-medios-de-pago.component.css'
})
export class AdminConfiguracionMediosDePagoComponent {
  nombresMediosDePago: string[] = [];
  nombresMediosDePagoFiltrados: string[] = [];

  mostrarModal: boolean = false;
  nuevoMedioDePago: string = '';

  mostrarModalEliminar: boolean = false;
  idSeleccionadoParaEliminar: number | null = null;

  listaMediosDePago: { id: number, nombre: string }[] = [];

  constructor(private medioDePagoService: MedioDePagoService) { }

  ngOnInit() {
    this.cargarMediosDePago();
  }

  cargarMediosDePago() {
    this.medioDePagoService.obtenerMediosDePago().subscribe(mediosDePago => {
      this.listaMediosDePago = mediosDePago;
      this.nombresMediosDePago = mediosDePago.map(m => m.nombre);
      this.nombresMediosDePagoFiltrados = [...this.nombresMediosDePago];
    });
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevoMedioDePago = '';
  }


  filtrarMediosDePago(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.toLowerCase();
    this.nombresMediosDePagoFiltrados = this.nombresMediosDePago.filter(nombre =>
      nombre.toLowerCase().includes(filtro)
    );
  }

  agregarMedioDePago() {
    const nombre = this.nuevoMedioDePago.trim();
    if (!nombre) return;

    this.medioDePagoService.agregarMedioDePago(nombre).subscribe({
      next: (medioDePago) => {
        this.nombresMediosDePago.push(medioDePago.nombre);
        this.nombresMediosDePagoFiltrados = [...this.nombresMediosDePago];
        this.cerrarModal();

        Swal.fire({
          icon: 'success',
          title: 'Medio de pago agregado',
          text: `El medio de pago "${medioDePago.nombre}" fue agregada exitosamente.`,
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false
        });

      },
      error: (err) => {
        console.error('Error al agregar medio de pago:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al guardar el medio de pago. Intentalo de nuevo.',
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

  eliminarMedioDePago() {
    if (this.idSeleccionadoParaEliminar === null) return;

    this.medioDePagoService.bajaMedioDePago(this.idSeleccionadoParaEliminar).subscribe({
      next: () => {
        this.cargarMediosDePago();
        this.cerrarModalEliminar();

        Swal.fire({
          icon: 'success',
          title: 'Medio de pago eliminado',
          text: 'El medio de pago fue eliminado exitosamente.',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      },
      error: (err) => {
        console.error('Error al eliminar medio de pago:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al eliminar el medio de pago. Intentalo de nuevo.',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
    });
  }
}
