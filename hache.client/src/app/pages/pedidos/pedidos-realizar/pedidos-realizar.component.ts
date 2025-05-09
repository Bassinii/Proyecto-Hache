import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../../../core/models/categoria';
import { TipoPedidoService } from '../../../core/services/tipo-pedido.service';
import { CategoriaService } from '../../../core/services/categoria.service';
import { Articulo } from '../../../core/models/articulo';
import { ArticuloServiceService } from '../../../core/services/articulo-service.service';
import { PedidoService } from '../../../core/services/pedido.service';
import { PedidoDTO } from '../../../core/DTOs/pedido.dto';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-pedidos-realizar',
  templateUrl: './pedidos-realizar.component.html',
  styleUrl: './pedidos-realizar.component.css'
})

export class PedidosRealizarComponent {

  categorias: Categoria[] = [];
  idTipoPedido: number = 0;

  categoriaSeleccionada: Categoria | null = null;
  busqueda: string = '';

  articulosOriginales: Articulo[] = [];      
  articulosFiltrados: Articulo[] = [];       
  articulosSeleccionados: Articulo[] = [];

  mostrarDropdown: boolean = false;

  nombrePedido: string = '';

  observacion: string = '';

  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private articuloService: ArticuloServiceService,
    private pedidoService: PedidoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const nombre = params.get('nombre');
      if (id) {
        this.idTipoPedido = +id;
        this.cargarCategorias();
        this.nombrePedido = nombre ?? ""
      }
    });
  }

  cargarCategorias() {
    this.categoriaService.obtenerCategoriasPorTipoPedido(this.idTipoPedido)
      .subscribe(cats => {
        this.categorias = cats;  
      });
  }

  onCategoriaSeleccionada(): void {
    if (this.categoriaSeleccionada) {
      this.articuloService.getArticulosPorCategoria(this.categoriaSeleccionada.id)
        .subscribe(articulos => {
          this.articulosOriginales = articulos;
          this.filtrarArticulos();
          this.mostrarDropdown = false; 
        });
    } else {
      this.articulosOriginales = [];
      this.articulosFiltrados = [];
      this.mostrarDropdown = false;
    }
  }

  filtrarArticulos(): void {
    const termino = this.busqueda.trim().toLowerCase();
    if (termino === '') {
      this.articulosFiltrados = [...this.articulosOriginales];
    } else {
      this.articulosFiltrados = this.articulosOriginales.filter(a =>
        a.nombre.toLowerCase().includes(termino)
      );
    }
  }

  seleccionarArticuloDesdeDropdown(articulo: Articulo): void {
    this.agregarArticulo(articulo);
    this.busqueda = '';
    this.mostrarDropdown = false;
  }

  agregarArticulo(articulo: Articulo): void {
    const yaExiste = this.articulosSeleccionados.some(a => a.id === articulo.id);
    if (!yaExiste) {
      this.articulosSeleccionados.push({ ...articulo, cantidad: 1 });
    }
  }

  eliminarArticulo(articulo: Articulo): void {
    this.articulosSeleccionados = this.articulosSeleccionados.filter(a => a.id !== articulo.id);
  }

  ocultarDropdown(): void {
    this.mostrarDropdown = false
  }

  realizarPedido(): void {

    let idLocal: number;
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token no encontrado.');
      return;
    }
    try {
      const decodedToken: any = jwtDecode(token);
      idLocal = Number(decodedToken['ID_Local']);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return;
    }

    if (!idLocal) return;

    if (this.articulosSeleccionados.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'Debe seleccionar al menos un artículo.'
      });
      return;
    }

    const hoy = new Date();
    const fechaHoy = hoy.toISOString(); 


    const pedido: PedidoDTO = {
      iD_TipoPedido: this.idTipoPedido,
      iD_Local: idLocal,
      estado: "Pendiente",
      fecha: fechaHoy,
      observacion: this.observacion,
      detallePedido: this.articulosSeleccionados.map(articulo => ({
        iD_Articulo: articulo.id,
        cantidad: articulo.cantidad ?? 1,
        precio_Unitario: articulo.precio 
      }))
    };

    console.log("Pedido a enviar:",pedido)
    this.pedidoService.agregarPedido(pedido).subscribe({
      next: () => {
        this.observacion = '';
        Swal.fire({
          icon: 'success',
          title: '¡Pedido realizado!',
          text: 'El pedido se envió con éxito.',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
        this.articulosSeleccionados = [];
      },
      error: (error) => {
        console.error('Error al cargar el pedido:', error);
        console.log('Detalles:', error.error);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al enviar el pedido. Intente nuevamente.'
        });
      }
    });
  }


  volverAPedidos() {
    this.router.navigate(['/pedidos']);
  }


}
