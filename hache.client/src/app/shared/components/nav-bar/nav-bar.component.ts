import { Component, OnInit } from '@angular/core';
import { ServiceAuthService } from '../../../auth/serviceAuth/service-auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {

  constructor(public authService: ServiceAuthService, private router: Router) { }

  ngOnInit(): void { }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

