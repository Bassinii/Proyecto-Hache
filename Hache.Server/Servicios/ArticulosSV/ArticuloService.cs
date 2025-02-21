using Microsoft.Data.SqlClient;
using Hache.Server.DAO;
using Hache.Server.Entities;
using System.Data;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System;
using System.Collections.Generic;

namespace Hache.Server.Servicios.ArticulosSV
{
    public class ArticuloService : IArticuloService
    {
        private readonly DaoArticulos _daoArticulos;
        private readonly DaoCategorias _daoCategorias;
        private readonly DaoMarcas _daoMarcas;
        private readonly DaoImagenes _daoImagenes;

        public ArticuloService(AccesoDB accesoDB)
        {
            _daoArticulos = new DaoArticulos(accesoDB);
            _daoCategorias = new DaoCategorias(accesoDB);
            _daoMarcas = new DaoMarcas(accesoDB);
            _daoImagenes = new DaoImagenes(accesoDB);   
        }

        public List<Articulo> ObtenerTodosLosArticulos()
        {
            DataTable tablaArticulos = _daoArticulos.tablaArticulos();
            List<Articulo> articulos = new List<Articulo>();

            foreach (DataRow row in tablaArticulos.Rows)
            {
                int IdArticulo = (int)row["ID_Articulo"];

                Articulo articulo = new Articulo

                {
                    ID_Articulo = IdArticulo,

                    Nombre = row["Nombre"]?.ToString() ?? string.Empty,

                    Precio = row["Precio_Unitario"] != DBNull.Value
                         ? Convert.ToDecimal(row["Precio_Unitario"])
                         : 0m,

                    Categoria = ObtenerCategoriaPorId((int)row["ID_Categoria"]),

                    Marca = ObtenerMarcaPorId((int)row["ID_Marca"]),


                    Imagen = _daoImagenes.ObtenerImagenesPorIdArticuloLista(IdArticulo),


                };
                articulos.Add(articulo);
            }

            return articulos;
        }

        public List<Articulo> ObtenerArticuloPorID(int IdArticulo)
        {

            DataTable tablaArticulo = _daoArticulos.ObtenerArticulosPorId(IdArticulo);
            List<Articulo> articulos = new List<Articulo>();

            if (tablaArticulo.Rows.Count > 0)
            {
                foreach (DataRow row in tablaArticulo.Rows)
                {
                    Articulo articuloNuevo = new Articulo
                    {
                        ID_Articulo = (int)row["ID_Articulo"],

                        Nombre = row["Nombre"]?.ToString() ?? string.Empty,

                        Precio = row["Precio_Unitario"] != DBNull.Value
                         ? Convert.ToDecimal(row["Precio_Unitario"])
                         : 0m,

                        Categoria = ObtenerCategoriaPorId((int)row["ID_Categoria"]),

                        Marca = ObtenerMarcaPorId((int)row["ID_Marca"]),


                        Imagen = _daoImagenes.ObtenerImagenesPorIdArticuloLista(IdArticulo),
                    };

                    articulos.Add(articuloNuevo);
                }
                
            }
            return articulos;
        }

        private Categoria ObtenerCategoriaPorId(int IdCategoria)
        {
            DataTable tablaCategoria = _daoCategorias.ObtenerCategoriaPorId(IdCategoria);
            DataRow row = tablaCategoria.Rows[0];

            return new Categoria
            {
                ID_Categoria = (int)row["ID_Categoria"],
                Nombre = row["Nombre"]?.ToString() ?? string.Empty
            };

        }

        private Marca ObtenerMarcaPorId(int IdMarca)
        {
            DataTable tablaMarca = _daoMarcas.ObtenerMarcaPorId(IdMarca);
            DataRow row = tablaMarca.Rows[0];

            return new Marca
            {
                ID_Marca = (int)row["ID_Marca"],
                nombre = row["Nombre"]?.ToString() ?? string.Empty
            };
        }

       
        public Articulo CargarArticulo(Articulo articulo)
        {
            _daoArticulos.AgregarArticulo(articulo);
            return articulo;
        }

        public void ModificarPrecioArticulo(int idArticulo, decimal NuevoPrecio)
        {
            _daoArticulos.ModificarPrecioArticulo(idArticulo, NuevoPrecio);
        }

        public void BajaArticulo(int idArticulo)
        {
            _daoArticulos.BajaArticulo(idArticulo);
        }

    }
}

