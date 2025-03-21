import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Articulo } from '../../../core/models/articulo';
import { Categoria } from '../../../core/models/categoria';
import { Marca } from '../../../core/models/marca';
import { ArticuloServiceService } from '../../../core/services/articulo-service.service';
import { CategoriaService } from '../../../core/services/categoria.service';
import { MarcaService } from '../../../core/services/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  articulos: Articulo[] = [];
  categorias: Categoria[] = [];
  marcas: Marca[] = [];
  articuloForm!: FormGroup;
  articuloSeleccionado!: Articulo;

  mostrarConfirmacion: boolean = false;

  mostrarCanvas: boolean = true;

  constructor(
    private articuloService: ArticuloServiceService,
    private categoriaService: CategoriaService,
    private marcaService: MarcaService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.obtenerArticulos();
    this.obtenerCategorias();
    this.obtenerMarcas();
    this.initForm();
  }

  obtenerArticulos() {
    this.articuloService.getArticulos().subscribe({
      next: (data) => {
        this.articulos = data;
      },
      error: (error) => {
        console.error('Error al obtener los artículos:', error);
      }
    });
  }

  obtenerCategorias() {
    this.categoriaService.obtenerCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    });
  }

  obtenerMarcas() {
    this.marcaService.obtenerMarcas().subscribe({
      next: (data) => {
        this.marcas = data;
      },
      error: (error) => {
        console.error('Error al obtener las marcas:', error);
      }
    });
  }

  initForm() {
    this.articuloForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      categoria: [null, Validators.required],
      marca: [null, Validators.required]
    });
  }

  abrirEdicion(articulo: Articulo) {

    //console.log('Artículo recibido:', articulo);

    this.articuloSeleccionado = articulo;

    this.articuloForm.patchValue({
      nombre: articulo.nombre,
      precio: articulo.precio,
      categoria: articulo.categoria?.id ?? null,
      marca: articulo.marca?.id ?? null
    });
    this.mostrarCanvas = true;   
  }

  cerrarCanvas() {
    this.mostrarCanvas = false; // Ocultar el canvas
  }

  guardarCambios() {
    if (this.articuloForm.valid) {

      const Idcategoria = Number(this.articuloForm.value.categoria);
      const Idmarca = Number(this.articuloForm.value.marca);

      const articuloEditado: Articulo = {
        ...this.articuloSeleccionado,
        ...this.articuloForm.value,
        categoria: this.categorias.find(c => c.id === Idcategoria) ?? null,
        marca: this.marcas.find(m => m.id === Idmarca) ?? null
      };

      this.articuloService.actualizarArticulo(articuloEditado).subscribe({
        next: (response) => {
          this.obtenerArticulos();
          this.cerrarCanvas();
         
            const backdrop = document.querySelector('.offcanvas-backdrop');
            if (backdrop) {
              backdrop.remove();
            }
            // Restaura el scroll solo si es necesario
            //document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
            //document.body.style.paddingRight = '';

          Swal.fire({
            title: 'Articulo actualizado',
            text: 'El articulo se ha actualizado correctamente.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
        },
        error: (error) => {
          console.error('Error al actualizar el artículo:', error);
          Swal.fire('Error', 'No se pudo actualizar el articulo.', 'error');
          
        }
      });
    } 
  }


  BajaArticulo(idArticulo: number) {
    Swal.fire({
        text: '¿Estás seguro de que deseas borrar el articulo?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#f34b4b',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar',
        width: '400px',

      }).then((result) => {
        if (result.isConfirmed) {
        this.articuloService.BajaArticulo(idArticulo).subscribe({
          next: () => {
            Swal.fire({
              title: 'Articulo dado de baja',
              text: 'El articulo se ha borrado correctamente.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
            this.obtenerArticulos(); 
          },
          error: (error) => {
            Swal.fire('Error', 'No se pudo eliminar el articulo.', 'error');
            console.error('Error al dar de baja el Articulo:', error);
          }
        }); 
      }
    });
  }
}
