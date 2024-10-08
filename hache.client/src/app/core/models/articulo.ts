import { Categoria } from "./categoria";
import { Imagen } from "./imagen";
import { Marca } from "./marca";

export interface Articulo {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: Categoria;
  marca: Marca;
  imagen: Imagen[];
}
