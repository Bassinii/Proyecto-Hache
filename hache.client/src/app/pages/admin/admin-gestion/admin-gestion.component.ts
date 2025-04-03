import { Component, OnInit } from '@angular/core';
import { stockDTO } from './stockDTO';
import { StockServiceService } from '../../../core/services/stock-service.service';
import { ArticuloServiceService } from '../../../core/services/articulo-service.service';

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



  locales = [
    { id: 1, nombre: 'Don Torcuato' },
    { id: 2, nombre: 'Acassuso' },
    { id: 3, nombre: 'Vicente López' },
    { id: 4, nombre: 'Lomas' }
  ];

  constructor(private stockService: StockServiceService, private articuloService: ArticuloServiceService) { }

  ngOnInit(): void {
    this.cargarStock();
  }

  cargarStock(): void {
    this.stockService.getStocksLocal(this.idLocal).subscribe({
      next: (data) => {
        this.stock = [...data]; // Cargamos inicialmente el stock sin categorías

        // Para cada artículo, obtenemos su categoría y la asignamos individualmente
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
