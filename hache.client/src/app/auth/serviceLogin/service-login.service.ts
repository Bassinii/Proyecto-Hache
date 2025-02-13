import { Injectable } from '@angular/core';
import { loginRequest } from './loginRequest';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {

  constructor() { }

  Login(credentials: loginRequest) {
    console.log(credentials);
  }
}
