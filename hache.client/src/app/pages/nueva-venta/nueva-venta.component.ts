import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../core/models/articulo';
import { ArticuloServiceService } from '../../core/services/articulo-service.service';

@Component({
  selector: 'nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrl: './nueva-venta.component.css'
})
export class NuevaVentaComponent implements OnInit {
  public datos: any[] = [];

  constructor(private articuloService: ArticuloServiceService) { }

  ngOnInit() {
    this.getArticulos();
  }

  public getArticulos() {
    this.articuloService.getArticulos().subscribe(data => {
      this.datos = data;
      console.log(this.datos); 
    })
  }



}
