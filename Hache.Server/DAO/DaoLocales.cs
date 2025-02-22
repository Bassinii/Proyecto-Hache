using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoLocales
    {
        AccesoDB Acceso = new AccesoDB();

        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoLocales(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        public DataTable tablaLocales()
        {
            string consulta = ("SELECT ID_Local, Nombre from Locales WHERE ActivoLocal=1");
            return _accesoDB.ObtenerTabla("Locales", consulta);
        }
        public DataTable ObtenerLocalPorId(int idLocal)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_Local, Nombre FROM Locales  WHERE ID_Local = @ID_Local AND ActivoLocal=1";

            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Local", SqlDbType.Int) { Value = idLocal }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("Locales", consulta, parametros);
        }

        public void BajaLocal(int idLocal)
        {
            string consulta = "UPDATE Locales SET ActivoLocal = 0 WHERE ID_Local = @ID_Local";
            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Local", SqlDbType.Int) { Value = idLocal }
            };

            _accesoDB.EjecutarComando(consulta, parametros);
        }
    }
}
