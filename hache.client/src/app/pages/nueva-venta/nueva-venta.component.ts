import { Component, OnInit, signal, computed } from '@angular/core';
import { CarritoServiceService } from '../../core/services/carrito-service.service';
import { Venta } from '../../core/models/venta';
import { VentasService } from '../../core/services/ventas.service';
import { MedioDePagoService } from '../../core/services/medio-de-pago.service';
import { MedioDePago } from '../../core/models/medio-de-pago';

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrl: './nueva-venta.component.css'
})
export class NuevaVentaComponent implements OnInit {
  mostrarModal: boolean = false;
  mostrarToast: boolean = false;
    


  constructor(  ) {}

  ngOnInit() {

  }


  //abre el modal pero antes ejecuta ciertos métodos
  abrirModal() {
  //  this.subtotal.set(this.carritoService.getTotal()); //

  //  if (this.pedidoYa) {
  //    this.subtotal.set(this.subtotal() / 0.82);
  //  }

  //  this.totalConDescuento = this.subtotal();
  //  this.aplicarDescuento();
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }




  //calcularTotal() {
  //  const precioBase = 1000; // Lógica real aquí
  //  return precioBase - (precioBase * (this.descuento / 100));
  //}





  

  cerrarToast() {
    this.mostrarToast = false;
  }





}
