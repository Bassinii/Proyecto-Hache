import { Component, OnInit } from '@angular/core';
import { Venta } from '../../core/models/venta';
import { VentasService } from '../../core/services/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit {

  public ventas: Venta[] = [];
  constructor(private ventaServicio_: VentasService) { }



  ngOnInit() {
    this.obtenerVentas();
  }

  obtenerVentas() {
    this.ventaServicio_.obtenerVentas().subscribe({
      next: (data) => {
        this.ventas = data;
      },
      error: (error) => {
        console.log('Se produjo un error al recibir las ventas: ', error);
      }
    })
    console.log(this.ventas);
  }

}
