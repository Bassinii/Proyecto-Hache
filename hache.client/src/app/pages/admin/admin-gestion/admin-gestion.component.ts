import { Component, OnInit} from '@angular/core';
import { Stock } from '../../../core/models/stock';

@Component({
  selector: 'app-admin-gestion',
  templateUrl: './admin-gestion.component.html',
  styleUrl: './admin-gestion.component.css'
})
export class AdminGestionComponent {

  public stock: Stock[] = [];

  constructor() { }


}
