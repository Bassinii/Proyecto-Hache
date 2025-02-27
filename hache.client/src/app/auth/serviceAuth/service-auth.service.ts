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
      return this.getToken() !== null;
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

