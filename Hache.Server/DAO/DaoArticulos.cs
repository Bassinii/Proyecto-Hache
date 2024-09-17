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
            string consulta = "SELECT ID_Articulos, Nombre FROM Articulos  WHERE ID_Articulos = @ID_Articulos";

            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Articulos", SqlDbType.Int) { Value = idArticulos }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("Articulos", consulta, parametros);
        }
    }
}
