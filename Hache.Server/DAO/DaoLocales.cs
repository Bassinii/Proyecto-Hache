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
            string consulta = ("SELECT ID_Local, Nombre from Locales");
            return _accesoDB.ObtenerTabla("Locales", consulta);
        }
    }
}
