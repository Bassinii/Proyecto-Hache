using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoTipoUsuarios
    {


        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoTipoUsuarios(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        public DataTable tablaTipoUsuarios()
        {
            string consulta = ("SELECT ID_TipoUsuarios, Nombre from TipoUsuarios");
            return _accesoDB.ObtenerTabla("TipoUsuarios", consulta);
        }
        public DataTable ObtenerTipoUsuariosPorId(int idTipoUsuarios)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_TipoUsuarios, Nombre FROM TipoUsuarios  WHERE ID_TipoUsuarios = @ID_TipoUsuarios";

            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_TipoUsuarios", SqlDbType.Int) { Value = idTipoUsuarios }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("TipoUsuarios", consulta, parametros);
        }
    }
}
