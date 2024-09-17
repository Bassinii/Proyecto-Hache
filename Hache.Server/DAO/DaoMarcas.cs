using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoMarcas
    {

        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoMarcas(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        public DataTable tablaMarcas()
        {
            string consulta = ("SELECT ID_Marca, Nombre from Marcas");
            return _accesoDB.ObtenerTabla("Marcas", consulta);
        }

        public DataTable ObtenerMarcaPorId(int idMarca)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_Marca, Nombre FROM Marcas WHERE ID_Marca = @ID_Marca";

            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Marca", SqlDbType.Int) { Value = idMarca }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("Marcas", consulta, parametros);
        }

    }
}
