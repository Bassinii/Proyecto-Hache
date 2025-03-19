import { Component, OnInit } from '@angular/core';
import { stockDTO } from './stockDTO';
import { StockServiceService } from '../../../core/services/stock-service.service';

@Component({
  selector: 'app-admin-gestion',
  templateUrl: './admin-gestion.component.html',
  styleUrls: ['./admin-gestion.component.css']
})
export class AdminGestionComponent implements OnInit {

  stock: stockDTO[] = [];
  idLocal: number = 1; 

  locales = [
    { id: 1, nombre: 'Don Torcuato' },
    { id: 2, nombre: 'Acassuso' },
    { id: 3, nombre: 'Vicente López' },
    { id: 4, nombre: 'Lomas' }
  ];

  constructor(private stockService: StockServiceService) { }

  ngOnInit(): void {
    this.cargarStock();
  }

  cargarStock(): void {
    this.stockService.getStocksLocal(this.idLocal).subscribe({
      next: (data) => {
        this.stock = [...data];
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
}
