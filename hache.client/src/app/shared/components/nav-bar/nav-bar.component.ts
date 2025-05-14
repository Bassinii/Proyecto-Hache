import { Component, OnInit } from '@angular/core';
import { ServiceAuthService } from '../../../auth/serviceAuth/service-auth.service';
import { Router } from '@angular/router';
import { LocalService } from '../../../core/services/local.service';


@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {

  constructor(public authService: ServiceAuthService, private router: Router, private localService: LocalService) { }


  nombreUsuario = '';
  nombreCompleto = '';
  correoElectronico = '';
  rol: number | null = null;
  rolNombre: string = '';
  localNombre: string = '';

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || '';
    this.nombreCompleto = localStorage.getItem('nombreCompleto') || '';
    this.correoElectronico = localStorage.getItem('CorreoElectronico') || ''; 
    this.rol = this.authService.getUserRole();
    if (this.rol === 1) {
      this.rolNombre = 'Administrador';
    } else if (this.rol === 2) {
      this.rolNombre = 'Vendedor';
    } else {
      this.rolNombre = 'Rol desconocido';
    }

    this.obtenerNombreLocal();
  }

 

  obtenerNombreLocal() {
   const idLocal = this.authService.getUserIdLocal();

    if (idLocal == null) return;

    this.localService.obtenerLocalPorId(idLocal).subscribe({
      next: (data) => {
        this.localNombre = data.nombre;
      },
      error: (error) => {
        console.error('❌ Error al obtener los locales:', error);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

