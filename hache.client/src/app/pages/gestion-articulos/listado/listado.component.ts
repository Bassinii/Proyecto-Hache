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
      stock: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      marca: ['', Validators.required]
    });
  }

  abrirEdicion(articulo: Articulo) {
    this.articuloSeleccionado = articulo;
    this.articuloForm.patchValue({
      nombre: articulo.nombre,
      precio: articulo.precio,
      stock: articulo.stock,
      categoria: articulo.categoria.id,
      marca: articulo.marca.id
    });
  }

  guardarCambios() {
    if (this.articuloForm.valid) {
      const articuloEditado = {
        ...this.articuloSeleccionado,
        ...this.articuloForm.value,
        categoria: this.categorias.find(c => c.id === +this.articuloForm.value.categoria),
        marca: this.marcas.find(m => m.id === +this.articuloForm.value.marca)
      };

      this.articuloService.actualizarArticulo(articuloEditado).subscribe({
        next: () => {
          this.obtenerArticulos();
          alert('Artículo actualizado correctamente');
        },
        error: (error) => {
          console.error('Error al actualizar el artículo:', error);
        }
      });
    }
  }
}
