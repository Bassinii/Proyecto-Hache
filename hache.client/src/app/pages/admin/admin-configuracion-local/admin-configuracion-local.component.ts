import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../../core/services/local.service';

@Component({
  selector: 'app-admin-configuracion-local',
  templateUrl: './admin-configuracion-local.component.html',
  styleUrl: './admin-configuracion-local.component.css'
})
export class AdminConfiguracionLocalComponent implements OnInit{
  nombresLocales: string[] = [];
  nombresLocalesFiltrados: string[] = [];

  constructor(private localService: LocalService) { }

  ngOnInit() {
    this.localService.obtenerLocales().subscribe(locales => {
      this.nombresLocales = locales.map(local => local.nombre);
      this.nombresLocalesFiltrados = [...this.nombresLocales];
    });
  }

  filtrarLocales(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.toLowerCase();
    this.nombresLocalesFiltrados = this.nombresLocales.filter(nombre =>
      nombre.toLowerCase().includes(filtro)
    );
  }
}
