import { Component,OnInit } from '@angular/core';
import { LocalService } from '../../../core/services/local.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-reportes-venta',
  templateUrl: './admin-reportes-venta.component.html',
  styleUrl: './admin-reportes-venta.component.css'
})
export class AdminReportesVentaComponent {
  nombresLocales: string[] = [];

  constructor(private localService: LocalService) { }

  ngOnInit() {
    this.localService.obtenerLocales().subscribe(locales => {
      this.nombresLocales = locales.map(local => local.nombre);
    });
  }

  obtenerReporte(nombre: string) {
   
    
  }
}
