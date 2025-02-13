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
      this.loginService.Login(this.loginForm.value as loginRequest);
      this.Router.navigateByUrl('/nueva-venta');
      this.loginForm.reset();
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }
}
