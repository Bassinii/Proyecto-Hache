import { Component, OnInit} from '@angular/core';
import { Stock } from '../../../core/models/stock';
import { Articulo } from '../../../core/models/articulo';

@Component({
  selector: 'app-admin-gestion',
  templateUrl: './admin-gestion.component.html',
  styleUrl: './admin-gestion.component.css'
})
export class AdminGestionComponent {

  stock: Stock[] = [];
  articulos: Articulo[] = [{ id: 1, nombre: 'mateGay', precio: 777, stock: 1, categoria: { id: 1, nombre: 'cacona' }, marca: { id: 1, nombre: 'MateGAy' }, imagen: [] }];

  constructor() { }


}
