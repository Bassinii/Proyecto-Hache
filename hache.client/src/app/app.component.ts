import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceAuthService } from './auth/serviceAuth/service-auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  isLoginPage: boolean = false;

  constructor(private http: HttpClient, private router: Router, private auth: ServiceAuthService ) {
    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url === '/login';
    });
}
  ngOnInit(): void {
    this.auth.checkTokenAndLogoutIfExpired();
  }

  title = 'hache.client';
}


