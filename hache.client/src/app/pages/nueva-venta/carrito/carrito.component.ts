import { Component, OnInit } from '@angular/core';
import { ArticuloCarrito } from '../../../core/models/articulo-carrito';
import { CarritoServiceService } from '../../../core/services/carrito-service.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  datos: any[] = [];
  totalCarrito: number = 18400;

  constructor(private servicio: CarritoServiceService) { }

  ngOnInit(): void {

  }

  get carrito() {
    return this.servicio.getCarrito();
  }


}
