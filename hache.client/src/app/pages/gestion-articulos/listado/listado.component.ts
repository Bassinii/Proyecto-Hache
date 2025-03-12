import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Articulo } from '../../../core/models/articulo';
import { Categoria } from '../../../core/models/categoria';
import { Marca } from '../../../core/models/marca';
import { ArticuloServiceService } from '../../../core/services/articulo-service.service';
import { CategoriaService } from '../../../core/services/categoria.service';
import { MarcaService } from '../../../core/services/marca.service';

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
    console.log('Artículo recibido:', articulo);

    this.articuloSeleccionado = articulo;

    this.articuloForm.patchValue({
      nombre: articulo.nombre,
      precio: articulo.precio,
      categoria: articulo.categoria?.id ?? null,
      marca: articulo.marca?.id ?? null
    });

    console.log('Formulario después de patchValue:', this.articuloForm.value);
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

      console.log("Artículo a enviar:", JSON.stringify(articuloEditado, null, 2));

      this.articuloService.actualizarArticulo(articuloEditado).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.obtenerArticulos();
          alert('Artículo actualizado correctamente');
        },
        error: (error) => {
          console.error('Error al actualizar el artículo:', error);
          console.error('Detalles del error:', error.error);
        }
      });
    } else {
      console.log("Formulario inválido:", this.articuloForm.errors);

      Object.keys(this.articuloForm.controls).forEach(key => {
        const control = this.articuloForm.get(key);
        if (control?.invalid) {
          console.log(`Error en el campo ${key}:`, control.errors);
        }
      });
    }
  }
}
