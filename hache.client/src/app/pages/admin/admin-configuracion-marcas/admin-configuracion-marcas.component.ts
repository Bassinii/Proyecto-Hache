import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../../../core/services/marca.service';

@Component({
  selector: 'app-admin-configuracion-marcas',
  templateUrl: './admin-configuracion-marcas.component.html',
  styleUrl: './admin-configuracion-marcas.component.css'
})
export class AdminConfiguracionMarcasComponent implements OnInit {
  nombresMarcas: string[] = [];
  nombresMarcasFiltradas: string[] = [];

  constructor(private marcaService: MarcaService) { }

  ngOnInit() {
    this.marcaService.obtenerMarcas().subscribe(marcas => {
      this.nombresMarcas = marcas.map(marca => marca.nombre);
      this.nombresMarcasFiltradas = [...this.nombresMarcas];
    });
  }

  filtrarMarcas(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.toLowerCase();
    this.nombresMarcasFiltradas = this.nombresMarcas.filter(nombre =>
      nombre.toLowerCase().includes(filtro)
    );
  }
}
