import { Component, OnInit } from '@angular/core';
import { ArticuloCarrito } from '../../../core/models/articulo-carrito';
import { CarritoServiceService } from '../../../core/services/carrito-service.service';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{
  datos: ArticuloCarrito[] = [];

  constructor(private servicio : CarritoServiceService) { }

  ngOnInit(): void {
    this.getcarrito();
  }



  getcarrito() {
    this.datos = this.servicio.getCarrito();
    return this.datos;
  }


}
