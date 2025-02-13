import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private Router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      password: ['',[Validators.required]],
    });
  }

  get usuario() {
    return this.loginForm.controls['usuario'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }
 
  login() {
    if (this.loginForm.valid) {
      console.log('Crear Servicio de Login');
      this.Router.navigateByUrl('/nueva-venta');
      this.loginForm.reset();
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }
}
