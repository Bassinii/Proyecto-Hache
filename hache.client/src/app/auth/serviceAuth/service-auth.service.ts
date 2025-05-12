import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ServiceAuthService {

  constructor(private router: Router) { }

    getToken(): string | null {
      return localStorage.getItem('authToken');
    }

  getUserRole(): number | null {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token no encontrado.');
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const role = Number(decodedToken['userRole']);
      return isNaN(role) ? null : role;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }


  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const expiry = decoded.exp * 1000; 
      const now = Date.now();
      if (now > expiry) {
        this.logout();
        return false;
      }
      return true;
    } catch (err) {
      this.logout();
      return false;
    }
  }

  checkTokenAndLogoutIfExpired(): void {
    if (!this.isAuthenticated()) {
      this.logout();   
      this.router.navigate(['/login']);
    }
  }


    logout(): void {
      localStorage.removeItem('authToken');
      localStorage.removeItem('nombreUsuario');
      localStorage.removeItem('nombreCompleto');
      localStorage.removeItem('CorreoElectronico');
    }
}

