using Microsoft.Data.SqlClient;
using Hache.Server.DAO;
using Hache.Server.Entities;
using Hache.Server.Servicios.ConexionDB;
using System.Data;

namespace Hache.Server.Servicios.Articulos
{
    public class ArticuloService : IArticuloService
    {
        private readonly DaoArticulos _daoArticulos;

        public ArticuloService(AccesoDB accesoDB)
        {
            _daoArticulos = new DaoArticulos(accesoDB);
        }

        public List<Articulo> ObtenerTodosLosArticulos()
        {
            DataTable tablaArticulos = _daoArticulos.TablaArticulos();
            List<Articulo> articulos = new List<Articulo>();

            foreach (DataRow row in tablaArticulos.Rows)
            {
                Articulo articulo = new Articulo
                {
                    ID_Articulo = (int)row["ID_Articulo"],

                    Nombre = row["Nombre"].ToString(),

                    Precio = row["Precio_Unitario"] != DBNull.Value
                         ? Convert.ToDecimal(row["Precio_Unitario"])
                         : 0m, // Valor predeterminado en caso de que sea nulo

                    // Asume que tienes lógica para obtener Categoria y Marca
                    // Cateogoria = new Categoria { /* ... */ },
                    // Marca = new Marca { /* ... */ }
                };
                articulos.Add(articulo);
            }

            return articulos;
        }
    }
}

