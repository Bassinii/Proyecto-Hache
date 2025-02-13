import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {

  UserLogin: boolean = true;
  constructor() { }


  ngOnInit(): void { }
}

