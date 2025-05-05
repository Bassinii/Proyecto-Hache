import { Categoria } from "../models/categoria";
import { Marca } from "../models/marca";

export interface ArticuloDTO {
  nombre: string;
  codigoXubio?: string;
  precio: number;
  categoria: Categoria;
  marca: Marca;
}
