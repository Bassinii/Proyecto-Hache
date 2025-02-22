import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('authToken');

  if (token) {
    // Si el token existe, permite el acceso a la ruta
    return true;
  } else {
    // Si no hay token, redirige al login
    router.navigate(['/login']);
    return false;
  }
};
