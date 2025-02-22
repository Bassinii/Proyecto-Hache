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
       
          const token = response.token;
          const userRole = response.tipoUsuario.iD_TipoUsuario;

          if (token && userRole !== undefined) {
            console.log(token);
            console.log(userRole);
            localStorage.setItem('authToken', token);     
            localStorage.setItem('userRole', userRole.toString());

              this.Router.navigateByUrl('/nueva-venta');
     
          } else {
            console.error('Login fallido: token null');
          }
        },
        error: (errorData) => {
          console.error('Error de login:', errorData);
        },
      });

    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }
}
