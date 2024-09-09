using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class Marcas
    {
        AccesoDB Acceso = new AccesoDB();

        public DataTable TablaMarcas()
        {
            DataTable Table = Acceso.ObtenerTabla("Marcas","SELECT ID_Marcas, Nombre from Marcas");
            return Table;

        }


        
    }
}
