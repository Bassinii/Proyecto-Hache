import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceLoginService } from '../serviceLogin/service-login.service';
import { loginRequest } from '../serviceLogin/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private Router: Router, private loginService: ServiceLoginService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      NombreUsuario: ['', [Validators.required]],
      Contrasenia: ['',[Validators.required]],
    });
  }

  get usuario() {
    return this.loginForm.controls['NombreUsuario'];
  }

  get password() {
    return this.loginForm.controls['Contrasenia'];
  }
 
  login() {
    if (this.loginForm.valid) {

      this.loginService.Login(this.loginForm.value as loginRequest).subscribe({
        next: (response) => {
          if (response && response.Token) {

            localStorage.setItem('authToken', response.Token); // Guarda el token

            this.Router.navigateByUrl('/nueva-venta'); // Redirige después de recibir el token

          } else if  (response.Token == null) {

            console.error('Login fallido:token null');

          }
        },
        error: (errorData) => {
          console.error('Error de login:', errorData);
          console.log('Errores de validación:', errorData.error.errors);
        },

        complete: () => { },
      })

      this.loginForm.reset();
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }
}
