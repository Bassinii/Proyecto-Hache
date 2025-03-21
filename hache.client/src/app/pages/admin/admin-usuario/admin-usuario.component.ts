import { Component,OnInit} from '@angular/core';
import { UsuarioServiceService } from '../../../core/services/usuario-service.service';
import { Usuario } from '../../../core/models/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';




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

  mostrarCanvas: boolean = true;
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
      this.mostrarCanvas = true;    
  }

  cerrarCanvas() {
    this.mostrarCanvas = false; // Ocultar el canvas
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
            this.cerrarCanvas();
            const backdrop = document.querySelector('.offcanvas-backdrop');
            if (backdrop) {
              backdrop.remove();
            }

            document.body.style.overflow = ''; //Resetear body para que se restablezca la barra de desplazamiento

            Swal.fire({
              title: 'Usuario actualizado',
              text: 'El Usuario se ha actualizado correctamente.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (error) => {
            console.error('Error al actualizar el usuario:', error);
            Swal.fire('Error', 'No se pudo actualizar el usuario.', 'error');
          }

        });
    }
  }

  BajaUsuario(idUsuario: number) {
      Swal.fire({
        text: '¿Estás seguro de que deseas dar de baja el usuario?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#f34b4b',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar',
        width: '400px',

        }).then((result) => {
          if (result.isConfirmed) {
            this.usuarioService.BajaUsuario(idUsuario).subscribe({
              next: () => {
              Swal.fire({
                title: 'Usuario dado de baja',
                text: 'El Usuario se ha borrado correctamente.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
              });
              this.obtenerUsuarios();
            },
              error: (error) => {
                Swal.fire('Error', 'No se pudo dar de baja el usuario.', 'error');
              console.error('Error al dar de baja el usuario:', error);
            }
          });
        }
      });
  }
} 

