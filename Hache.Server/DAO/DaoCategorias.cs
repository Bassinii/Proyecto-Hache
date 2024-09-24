using Hache.Server.DAO;
using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoCategorias
    {
        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoCategorias(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        public DataTable tablaCategoria()
        {
            string consulta = ("SELECT ID_Categoria, Nombre from Categorias");
             return _accesoDB.ObtenerTabla("Categorias", consulta);
        }

        public DataTable ObtenerCategoriaPorId(int idCategoria)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_Categoria, Nombre FROM Categorias WHERE ID_Categoria = @ID_Categoria";

            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Categoria", SqlDbType.Int) { Value = idCategoria }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("Categorias", consulta, parametros);
        }

    }
}


