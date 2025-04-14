import { Component, OnInit } from '@angular/core';
import { StockServiceService } from '../../../core/services/stock-service.service';
import { stockDTO } from '../../admin/admin-gestion/stockDTO';
import { ArticuloServiceService } from '../../../core/services/articulo-service.service';
import { Articulo } from '../../../core/models/articulo';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  modalAbierto: boolean = false;
  modalEgresoAbierto: boolean = false;

  busqueda: string = '';
  articulos: Articulo[] = [];
  articulosFiltrados: Articulo[] = []; 
  articulosSeleccionados: Articulo[] = []; 
  constructor(
    private stockService: StockServiceService,
    private articuloService: ArticuloServiceService
  ) { }

  ngOnInit() {
    this.ObtenerArticulos();

  }

  ObtenerArticulos() {
    this.articuloService.getArticulos().subscribe({
      next: (articulos) => {
        this.articulos = articulos;
      },
      error: (error) => {
        console.error('Error al obtener los artículos', error);
      }
    });
  }

  filtrarArticulos() {
    const texto = this.busqueda.toLowerCase().trim();
    this.articulosFiltrados = this.articulos.filter(a =>
      a.nombre.toLowerCase().includes(texto) &&
      !this.articulosSeleccionados.some(sel => sel.id === a.id)
    );
  }

  agregarArticulo(articulo: Articulo) {
    this.articulosSeleccionados.push({ ...articulo, cantidad: 1 });
    this.busqueda = '';
    this.articulosFiltrados = [];
  }

  eliminarArticulo(articulo: any) {
    this.articulosSeleccionados = this.articulosSeleccionados.filter(a => a !== articulo);
  }

  guardarStock(): void {
    const idLocal = Number(localStorage.getItem('idLocal'));

    let total = this.articulosSeleccionados.length;
    let completados = 0;
    let huboError = false;

    for (const articulo of this.articulosSeleccionados) {
      this.stockService.agregarOActualizarStock(articulo.id, idLocal, articulo.cantidad!)
        .subscribe({
          next: () => {
            completados++;
            checkCompletado();
          },
          error: (error) => {
            huboError = true;
            console.error(`Error al actualizar stock de ${articulo.nombre}:`, error);
            completados++;
            checkCompletado();
          }
        });
    }

    const checkCompletado = () => {
      if (completados === total) {
        if (!huboError) {
          Swal.fire({
            icon: 'success',
            title: 'Stock actualizado',
            text: 'Se ha actualizado el stock de los articulos correctamente.',
            timer: 2000,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar',
            text: 'Hubo errores al actualizar algunos artículos.',
            confirmButtonColor: '#d33'
          });
        }

        this.articulosSeleccionados = [];
        this.cerrarModal();
      }
    };
  }

  guardarEgresoStock(): void {
    const idLocal = Number(localStorage.getItem('idLocal'));

    let total = this.articulosSeleccionados.length;
    let completados = 0;
    let errores: string[] = [];

    for (const articulo of this.articulosSeleccionados) {
      const cantidadNegativa = -Math.abs(articulo.cantidad!);

      this.stockService.agregarOActualizarStock(articulo.id, idLocal, cantidadNegativa)
        .subscribe({
          next: () => {
            completados++;
            checkCompletado();
          },
          error: (error) => {
            console.error(`Error al descontar stock de ${articulo.nombre}:`, error);
            errores.push(`• ${articulo.nombre}`);
            completados++;
            checkCompletado();
          }
        });
    }

    const checkCompletado = () => {
      if (completados === total) {
        if (errores.length === 0) {
          Swal.fire({
            icon: 'success',
            title: 'Egreso de stock realizado',
            text: 'Los artículos han sido actualizados correctamente.',
            timer: 2000,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al egresar',
            html: `No se pudieron actualizar los siguientes artículos:<br>${errores.join('<br>')}`,
            confirmButtonColor: '#d33'
            
          });
            
        }

        this.articulosSeleccionados = [];
        this.cerrarModalEgreso();
      
        
      }
    };
  }





  abrirModal(): void {
    this.modalAbierto = true;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.articulosSeleccionados = [];
  }

  abrirModalEgreso(): void {
    this.modalEgresoAbierto = true;
  }

  cerrarModalEgreso(): void {
    this.modalEgresoAbierto = false;
    this.articulosSeleccionados = [];
  }
}

