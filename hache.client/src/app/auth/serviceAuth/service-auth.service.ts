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

  private getDecodedToken(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  getUserRole(): number | null {
    const decoded = this.getDecodedToken();
    const role = Number(decoded?.userRole);
    return isNaN(role) ? null : role;
  }

  getUserIdLocal(): number | null {
    const decoded = this.getDecodedToken();
    const idLocal = Number(decoded?.ID_Local);
    return isNaN(idLocal) ? null : idLocal;
  }

  getUserID(): number | null {
    const decoded = this.getDecodedToken();
    const idUsuario = Number(decoded?.ID_Usuario);
    return isNaN(idUsuario) ? null : idUsuario;
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

