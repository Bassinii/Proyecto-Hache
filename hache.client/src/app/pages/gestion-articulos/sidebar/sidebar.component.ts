import { Component } from '@angular/core';
import { StockServiceService } from '../../../core/services/stock-service.service';
import { stockDTO } from '../../admin/admin-gestion/stockDTO';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ArticuloServiceService } from '../../../core/services/articulo-service.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private stockService: StockServiceService, private articuloService: ArticuloServiceService) { }

  generarStockPDF() {
    const idLocal = Number(localStorage.getItem('idLocal'));
    if (!idLocal) {
      alert('No se encontró el ID del local.');
      return;
    }

    this.stockService.getStocksLocal(idLocal).subscribe({
      next: (stocks: stockDTO[]) => {
        const peticiones = stocks.map(stock =>
          this.articuloService.getArticuloPorId(stock.iD_Articulo)
        );

        forkJoin(peticiones).subscribe({
          next: (articulosArray) => {
            const stocksConDatos = stocks.map((stock, i) => {
              const articulo = articulosArray[i][0]; 
              return {
                ...stock,
                nombreArticulo: articulo?.nombre || `ID: ${stock.iD_Articulo}`,
                categoriaNombre: articulo?.categoria?.nombre || 'Sin categoría'
              };
            });

            // Genera el PDF y su estructura 
            const doc = new jsPDF();
            const fecha = new Date();
            const fechaStr = fecha.toLocaleString(); 

            doc.text('Stock del local', 10, 10);

            doc.setFontSize(12);
            doc.text(`Fecha: ${fechaStr}`, 150, 10);   

            const columns = ['Artículo', 'Categoría', 'Cantidad'];
            const rows = stocksConDatos.map(item => [
              item.nombreArticulo,
              item.categoriaNombre,
              item.cantidad.toString()
            ]);

            autoTable(doc, {
              head: [columns],
              body: rows,
              startY: 20
            });

            doc.save('stock-local.pdf');
          },
          error: () => alert('Error al obtener datos de artículos.')
        });
      },
      error: () => alert('Error al obtener los datos de stock.')
    });
  }
}
