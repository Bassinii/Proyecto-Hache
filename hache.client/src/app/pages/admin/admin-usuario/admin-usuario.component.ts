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

  mostrarConfirmacion: boolean = false;
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
      nombreCompleto: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      tipoUsuario: ['', Validators.required], 
      iD_Local: ['', Validators.required]  
    });
  }

  abrirEdicion(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
    this.usuarioForm.patchValue({
      nombreCompleto: usuario.nombreCompleto,
      correoElectronico: usuario.correoElectronico,
      tipoUsuario: usuario.tipoUsuario,
      iD_Local: usuario.iD_Local,
    });
  }

  guardarCambios() {
    if (!this.usuarioSeleccionado) {
      console.error('Error: No hay usuario seleccionado para actualizar.');
      return;
    }

    if (this.usuarioForm.valid) {

          const rolSeleccionado = this.usuarioForm.value.rol === 'Administrador' ? 1 : 2;

          const usuarioEditado: Usuario = {
                ...this.usuarioSeleccionado,
                ...this.usuarioForm.value,
                tipoUsuario: { ID_TipoUsuario: 2 }
          };

        console.log('Enviando datos al backend:', usuarioEditado);

        this.usuarioService.actualizarUsuario(usuarioEditado).subscribe({
          next: () => {
            this.obtenerUsuarios();
            this.mostrarConfirmacion = true;

            // Ocultar el mensaje después de 3 segundos
            setTimeout(() => {
              this.mostrarConfirmacion = false;
            }, 1500);
          },
          error: (error) => {
            console.error('Error al actualizar el usuario:', error);
            console.error('Detalles del error:', error.error);

          }
        });
    }
  }



}

