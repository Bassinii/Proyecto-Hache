import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ServiceAuthService {

  constructor() { }

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
    const expiration = localStorage.getItem('tokenExpiration');

    if (!token || !expiration) {
      return false;
    }

    const now = Date.now();
    if (now > parseInt(expiration)) {
      this.logout(); // 🔹 Elimina el token si ha expirado
      return false;
    }

    return true;
  }


    logout(): void {
      localStorage.removeItem('authToken');
      localStorage.removeItem('nombreUsuario');
      localStorage.removeItem('nombreCompleto');
      localStorage.removeItem('CorreoElectronico');
    }
}

