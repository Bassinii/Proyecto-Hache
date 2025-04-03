import { Categoria } from "./categoria";
import { Imagen } from "./imagen";
import { Marca } from "./marca";

export class Articulo {

  id!: number;
  nombre!: string;
  precio!: number;
  categoria!: Categoria;
  marca!: Marca;
  imagen!: Imagen[];
  cantidad?: number;
}
