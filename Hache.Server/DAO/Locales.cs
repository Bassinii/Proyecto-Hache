using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class Locales
    {
        AccesoDB Acceso = new AccesoDB();

        public DataTable TablaLocales()
        {
            DataTable Table = Acceso.ObtenerTabla("Locales", "SELECT ID_Local, Nombre from Locales");

            return Table;
        }
    }
}
