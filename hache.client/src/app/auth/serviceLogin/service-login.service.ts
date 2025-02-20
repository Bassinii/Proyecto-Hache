import { Injectable } from '@angular/core';
import { loginRequest } from './loginRequest';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../core/models/usuario';
import { AuthSessionDTO } from './AuthSessionDTO';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {

  private url: string = 'https://localhost:44369/api/Usuario/login'
  constructor(private http: HttpClient) {}


  Login(credentials: loginRequest): Observable<AuthSessionDTO> {
    return this.http.post<AuthSessionDTO>(this.url, credentials);
  }

}
