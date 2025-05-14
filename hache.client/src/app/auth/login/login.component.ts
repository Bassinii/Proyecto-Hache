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
  loginError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private Router: Router,
    private loginService: ServiceLoginService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      NombreUsuario: ['', [Validators.required]],
      Contrasenia: ['',[Validators.required]],
    });

    this.loginForm.valueChanges.subscribe(() => {
      if (this.loginError) {
        this.loginError = false;
      }
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

      this.loginError = false;

      this.loginService.Login(this.loginForm.value as loginRequest).subscribe({
        next: (response) => {

          console.log(response)
          const token = response.token;          
          const nombreUsuario = response.nombreUsuario;
          const nombreCompleto = response.nombreCompleto;          
          const CorreoElectronico = response.correoElectronico;

          if (token!== undefined) {

            localStorage.setItem('authToken', token);
            localStorage.setItem('nombreUsuario', nombreUsuario);
            localStorage.setItem('nombreCompleto', nombreCompleto); 
            localStorage.setItem('CorreoElectronico', CorreoElectronico);

            this.Router.navigateByUrl('/cargar-venta');
     
          } else {
            console.error('Login fallido: token null');
          }
        },
        error: (errorData) => {
          console.error('Error de login:', errorData);
          this.loginError = true;
        
        },
      });

    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }
}

