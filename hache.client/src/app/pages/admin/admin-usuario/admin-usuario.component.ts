import { Component,OnInit} from '@angular/core';
import { UsuarioServiceService } from '../../../core/services/usuario-service.service';
import { Usuario } from '../../../core/models/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LocalService } from '../../../core/services/local.service';
import { Local } from '../../../core/models/local';
import { tap } from 'rxjs';




@Component({
  selector: 'app-admin-usuario',
  templateUrl: './admin-usuario.component.html',
  styleUrl: './admin-usuario.component.css'
})
export class AdminUsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  local: Local[] = [];
  roles: string[] = ['Administrador', 'Vendedor'];
  usuarioForm!: FormGroup;
  usuarioSeleccionado!: Usuario;

  mostrarCanvas: boolean = true;
  constructor(private usuarioService: UsuarioServiceService, private formbuilder: FormBuilder,private localService_: LocalService) { }  

  ngOnInit() {
    this.ObtenerLocales().subscribe(() => {
      this.obtenerUsuarios();
    });
    this.initForm();
    
  }

  obtenerUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.usuarios = data.map((usuario) => ({
          ...usuario,
          nombreLocal: this.obtenerNombreLocal(usuario.iD_Local)

        }));

      },
      error: (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    });
  }

  getNombreTipoUsuario(usuario: Usuario): string {
    const tipoUsuarioID = usuario.tipoUsuario?.id || usuario.tipoUsuario; 
    return tipoUsuarioID === 2 ? 'Vendedor' : 'Administrador';
  }

  ObtenerLocales() {
    return this.localService_.obtenerLocales().pipe(
      tap((data) => this.local = data)
    );
  }

  obtenerNombreLocal(idLocal: number): string {
    const loc = this.local.find(m => m.id === idLocal);
    return loc ? loc.nombre : 'Desconocido';
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

    const tipoUsuarioID = usuario.tipoUsuario?.id || usuario.tipoUsuario; 

    this.usuarioSeleccionado = usuario;
    this.usuarioForm.patchValue({
      nombreCompleto: usuario.nombreCompleto,
      correoElectronico: usuario.correoElectronico,
      tipoUsuario: tipoUsuarioID === 2 ? 'Vendedor' : 'Administrador',
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
      const rolSeleccionado = this.usuarioForm.value.tipoUsuario === 'Administrador' ? 1 : 2;

      const usuarioEditado: Usuario = {
        ...this.usuarioSeleccionado,
        ...this.usuarioForm.value,
        tipoUsuario: { ID_TipoUsuario: rolSeleccionado } // Asegurarse de enviar la estructura correcta
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
          document.body.style.overflow = ''; // Resetear body

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

