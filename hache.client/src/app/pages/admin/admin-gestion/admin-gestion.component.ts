import { Component, OnInit } from '@angular/core';
import { stockDTO } from './stockDTO';
import { StockServiceService } from '../../../core/services/stock-service.service';
import { ArticuloServiceService } from '../../../core/services/articulo-service.service';
import Swal from 'sweetalert2';
import { LocalService } from '../../../core/services/local.service';


@Component({
  selector: 'app-admin-gestion',
  templateUrl: './admin-gestion.component.html',
  styleUrls: ['./admin-gestion.component.css']
})
export class AdminGestionComponent implements OnInit {

  stock: stockDTO[] = [];
  idLocal: number = 1;
  searchTerm: string = '';
  ordenDescendente: boolean = true;

  mostrarCanvas: boolean = false;
  stockSeleccionado?: stockDTO;
  nuevaCantidad: number = 0;

  locales: { id: number, nombre: string }[] = [];

  public page: number = 1;
  public itemsPerPage: number = 20; 

  constructor(
    private stockService: StockServiceService,
    private articuloService: ArticuloServiceService,
    private localService: LocalService
  ) { }

  ngOnInit(): void {
    this.cargarLocales();
  }

  cargarLocales(): void {
    this.localService.obtenerLocales().subscribe({
      next: (data) => {
        this.locales = data;
        if (this.locales.length > 0) {
          this.idLocal = this.locales[0].id; // Asignar primer local como predeterminado
          this.cargarStock();
        }
      },
      error: (error) => {
        console.error('Error al obtener los locales:', error);
        Swal.fire('Error', 'No se pudieron cargar los locales.', 'error');
      }
    });
  }

  cargarStock(): void {
    this.stockService.getStocksLocal(this.idLocal).subscribe({
      next: (data) => {
        this.stock = data.filter(item => item.cantidad > 0);

        this.stock.forEach((item) => {
          this.articuloService.getArticuloPorId(item.iD_Articulo).subscribe({
            next: (articulos) => {
              if (articulos.length > 0) {
                item.categoriaNombre = articulos[0].categoria?.nombre || 'Sin Categoría';
              } else {
                item.categoriaNombre = 'Sin Categoría';
              }
            },
            error: (error) => {
              console.error(`Error al obtener la categoría para el artículo ${item.iD_Articulo}:`, error);
              item.categoriaNombre = 'Error';
            }
          });
        });
      },
      error: (error) => {
        console.error('Error al obtener el stock:', error);
      }
    });
  }

  abrirCanvas(stock: stockDTO): void {
    this.stockSeleccionado = stock;
    this.nuevaCantidad = stock.cantidad;
    this.mostrarCanvas = true;
  }

  guardarCambios(): void {
    if (this.stockSeleccionado && this.nuevaCantidad >= 0) {
      this.stockService.editarStock(this.stockSeleccionado.iD_Stock, this.nuevaCantidad).subscribe({
        next: () => {
          this.mostrarCanvas = false;
          this.cargarStock();

          Swal.fire({
            title: 'Stock actualizado',
            text: 'El Stock se ha actualizado correctamente.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        },
        error: (error) => {
          console.error('Error al actualizar el stock:', error);
          Swal.fire('Error', 'No se pudo actualizar el stock.', 'error');
        }
      });
    }
  }

  onLocalChange(event: any): void {
    this.idLocal = Number(event.target.value);
    this.cargarStock();
  }

  filteredStock(): stockDTO[] {
    return this.stock
      .filter(item =>
        item.nombreArt.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .sort((a, b) => this.ordenDescendente ? b.cantidad - a.cantidad : a.cantidad - b.cantidad);
  }

  toggleOrden(): void {
    this.ordenDescendente = !this.ordenDescendente;
  }


}
