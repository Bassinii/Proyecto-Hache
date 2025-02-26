import { Component, Input, OnInit } from '@angular/core';
import { CarritoServiceService } from '../../../core/services/carrito-service.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {

  @Input() abrirModal!: () => void; // Recibe la función desde `NuevaVentaComponent`

  constructor(private servicio: CarritoServiceService) { }

  ngOnInit(): void { }

  get carrito() {
    return this.servicio.getCarrito();
  }

  get total() {
    return this.servicio.getTotal();
  }


}
