using Hache.Server.Entities;
using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoArticulos
    {
        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoArticulos(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        // Método que retorna la tabla de artículos
        public DataTable tablaArticulos()
        {
            string consulta = "SELECT ID_Articulo, Nombre, Precio_Unitario, ID_Categoria, ID_Marca FROM Articulos";
            return _accesoDB.ObtenerTabla("Articulos", consulta);
        }

        public DataTable ObtenerArticulosPorId(int idArticulos)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_Articulo, Nombre, Precio_Unitario, ID_Categoria, ID_Marca  FROM Articulos  WHERE ID_Articulo = @ID_Articulo";

            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Articulo", SqlDbType.Int) { Value = idArticulos }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("Articulos", consulta, parametros);
        }

        public Articulo ObtenerArticuloObjetoPorId(int idArticulo)
        {
            string consulta = @"
                 SELECT A.ID_Articulo, A.Nombre, A.Precio_Unitario, 
                 M.ID_Marca, M.Nombre AS MarcaNombre, 
                 C.ID_Categoria, C.Nombre AS CategoriaNombre
                 FROM Articulos A
                 INNER JOIN Marcas M ON A.ID_Marca = M.ID_Marca
                 INNER JOIN Categorias C ON A.ID_Categoria = C.ID_Categoria
                 WHERE A.ID_Articulo = @ID_Articulo";

            SqlParameter[] parametros = new SqlParameter[]
            {
        new SqlParameter("@ID_Articulo", SqlDbType.Int) { Value = idArticulo }
            };

            DataTable dataTable = _accesoDB.ObtenerTabla("Articulos", consulta, parametros);

            if (dataTable.Rows.Count > 0)
            {
                DataRow row = dataTable.Rows[0];
                return new Articulo
                {
                    ID_Articulo = (int)row["ID_Articulo"],
                    Nombre = row["Nombre"].ToString(),
                    Precio = Convert.ToDecimal(row["Precio_Unitario"]),

                    // Marca
                    Marca = new Marca
                    {
                        ID_Marca = (int)row["ID_Marca"],
                        nombre = row["MarcaNombre"].ToString()
                    },

                    // Categoria
                    Categoria = new Categoria
                    {
                        ID_Categoria = (int)row["ID_Categoria"],
                        Nombre = row["CategoriaNombre"].ToString()
                    }
                };
            }

            return null; // O manejar si el artículo no se encuentra
        }

    }
}
