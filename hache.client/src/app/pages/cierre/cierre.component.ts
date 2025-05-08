import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { TurnoCajaService } from '../../core/services/turno-caja.service';
import { jwtDecode } from 'jwt-decode';
import { TurnoCaja } from '../../core/models/turno-caja';
import { TurnoCajaDto } from '../../core/DTOs/turno-caja.dto';

@Component({
  selector: 'app-cierre',
  templateUrl: './cierre.component.html',
  styleUrl: './cierre.component.css'
})
export class CierreComponent {

  constructor(private cajaService: TurnoCajaService) { }

  montoApertura: number | null = null;
  montoCierre: number | null = null;
  montoRetiro: number | null = null;

  bloquearApertura = false;

  ngOnInit(): void {
    const montoApertura = localStorage.getItem('montoApertura');

    if (montoApertura) {
      this.montoApertura = parseFloat(montoApertura);
      this.bloquearApertura = localStorage.getItem('bloquearApertura') === 'true';
    }
  }

  confirmarApertura() {
    const input = (<HTMLInputElement>document.getElementById('montoInicial')).value;
    if (!input || isNaN(+input)) {
      Swal.fire('Error', 'Por favor ingresá un monto inicial válido.', 'error');
      return;
    }
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseás cargar el monto de apertura: $${input}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.montoApertura = +input;
        localStorage.setItem('montoApertura', this.montoApertura.toString());
        this.bloquearApertura = true;
        localStorage.setItem('bloquearApertura', 'true');

       
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error('Token no encontrado.');
          return;
        }

        let idLocal: number;
        let idUsuario: number;
        try {
          const decodedToken: any = jwtDecode(token);
          idLocal = Number(decodedToken['ID_Local']);
          idUsuario = Number(decodedToken['ID_Usuario']); 
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          return;
        }

        if (!idLocal || !idUsuario) {
          console.error('Error idLocal o idUsuario null');
          return;
        }

        const turnoCaja: TurnoCaja = {
          iD_Usuario: idUsuario, 
          iD_Local: idLocal,
          fechaApertura: new Date(),
          montoApertura: this.montoApertura,
          abierta: true
        };

        this.cajaService.abrirCaja(turnoCaja).subscribe({
          next: (response) => {
            const idTurnoCaja = response;
            localStorage.setItem('idTurnoCaja', idTurnoCaja);
            console.log(response)

            Swal.fire('Guardado', 'Monto de apertura registrado correctamente.', 'success');
          },
          error: err => {
            console.error(err);
            Swal.fire('Error', 'Ocurrió un problema al guardar la apertura.', 'error');
          }
        });
      }
    });
  }

  confirmarCierre() {
    const inputCierre = (<HTMLInputElement>document.getElementById('montoCierre')).value;
    if (!inputCierre || isNaN(+inputCierre)) {
      Swal.fire('Error', 'Por favor ingresá un monto de cierre válido.', 'error');
      return;
    }

    const inputRetiro = (<HTMLInputElement>document.getElementById('retiroCaja')).value;
    if (!inputRetiro || isNaN(+inputRetiro)) {
      Swal.fire('Error', 'Por favor ingresá un monto de retiro válido.', 'error');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseás realizar el cierre con monto de cierre: $${inputCierre} y retiro: $${inputRetiro}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar'
    }).then(result => {

      const idTurnoCajaString = localStorage.getItem('idTurnoCaja');
      if (!idTurnoCajaString) {
        Swal.fire('Error', 'No se encontró el ID de turno de caja para el cierre.', 'error');
        return;
      }
      const idTurnoCaja = Number(idTurnoCajaString);

      const dto: TurnoCajaDto = {
        idTurnoCaja: idTurnoCaja,
        fechaCierre: new Date(),
        montoCierre: Number(inputCierre) ,
        montoRetiro: Number(inputRetiro),
      };

      this.cajaService.cerrarCaja(dto).subscribe({
        next: () => {
          Swal.fire('Guardado', 'Cierre de caja registrado correctamente.', 'success');

          localStorage.removeItem('montoApertura');
          localStorage.removeItem('bloquearApertura');
          localStorage.removeItem('idTurnoCaja');

          (<HTMLInputElement>document.getElementById('montoCierre')).value = '';
          (<HTMLInputElement>document.getElementById('retiroCaja')).value = '';
          (<HTMLInputElement>document.getElementById('montoInicial')).value = '';
 
        },
        error: err => {
          console.error(err);
          Swal.fire('Error', 'Ocurrió un problema al registrar el cierre de caja.', 'error');
        }
      });

    });
  }

}
