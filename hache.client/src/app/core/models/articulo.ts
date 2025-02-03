import { Categoria } from "./categoria";
import { Imagen } from "./imagen";
import { Marca } from "./marca";

export interface iArticulo {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: Categoria;
  marca: Marca;
  imagen: Imagen[];
}

export class Articulo implements iArticulo{
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: Categoria;
  marca: Marca;
  imagen: Imagen[];

  constructor(id: number, nombre: string, descripcion: string, precio: number, stock: number, categoria: Categoria, marca: Marca, imagen: Imagen[]) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
    this.categoria = categoria;
    this.marca = marca;
    this.imagen = imagen;
  }
}
