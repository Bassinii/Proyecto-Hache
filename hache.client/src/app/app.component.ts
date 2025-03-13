import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  isLoginPage: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url === '/login';
    });
}
 
  ngOnInit(): void {
  }

  title = 'hache.client';
}


