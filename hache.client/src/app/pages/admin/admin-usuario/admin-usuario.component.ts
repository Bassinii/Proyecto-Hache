import { Component,OnInit } from '@angular/core';
import { UsuarioServiceService } from '../../../core/services/usuario-service.service';
import { Usuario } from '../../../core/models/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-usuario',
  templateUrl: './admin-usuario.component.html',
  styleUrl: './admin-usuario.component.css'
})
export class AdminUsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  roles: string[] = ['Administrador', 'Usuario'];
  usuarioForm!: FormGroup;
  usuarioSeleccionado!: Usuario;
  constructor(private usuarioService: UsuarioServiceService, private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.obtenerUsuarios();
    this.initForm();
  }

  obtenerUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    });
  }
  initForm() {
    this.usuarioForm = this.formbuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required] 
    });
  }

  abrirEdicion(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
    this.usuarioForm.patchValue({
      nombre: usuario.nombreCompleto,
      correo: usuario.correoElectronico,
      rol: usuario.tipoUsuario
    });
  }

  //guardarCambios() {
  //  if (this.usuarioForm.valid) {
  //    const usuarioEditado = {
  //      ...this.usuarioSeleccionado,
  //      ...this.usuarioForm.value
  //    };

  //    this.usuarioService.actualizarUsuario(usuarioEditado).subscribe({
  //      next: () => {
  //        this.obtenerUsuarios();
  //        alert('Usuario actualizado correctamente');
  //      },
  //      error: (error) => {
  //        console.error('Error al actualizar el usuario:', error);
  //      }
  //    });
  //  }
  //}
}

