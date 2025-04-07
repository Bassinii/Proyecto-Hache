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
  constructor(private marcaService: MarcaService) { }

  ngOnInit() {
    this.marcaService.obtenerMarcas().subscribe(marcas => {
      this.nombresMarcas = marcas.map(marca => marca.nombre);
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
}
