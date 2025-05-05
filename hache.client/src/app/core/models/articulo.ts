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
  codigoXubio?: string;
  cantidad?: number;

  //Implementados en siderbar de inventario

  cantidadActual?: number;
  idStock?: number;
}
