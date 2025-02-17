import { Injectable } from '@angular/core';
import { loginRequest } from './loginRequest';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../core/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {

  constructor(private http: HttpClient) {}


  Login(credentials: loginRequest): Observable<Usuario> {
    return this.http.post<Usuario>('URL', credentials);
  }
}
