import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceAuthService {

  constructor() { }

    getToken(): string | null {
      return localStorage.getItem('authToken');
    }

    getUserRole(): number | null {
      const role = localStorage.getItem('userRole');
      return role ? parseInt(role) : null;
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
      localStorage.removeItem('userRole');
      localStorage.removeItem('nombreUsuario');
      localStorage.removeItem('nombreCompleto');
      localStorage.removeItem('idLocal');
      localStorage.removeItem('idUsuario');
      localStorage.removeItem('CorreoElectronico');
    }
}

