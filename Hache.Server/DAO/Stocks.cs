using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class Stocks
    {
        AccesoDB Acceso = new AccesoDB();

        public DataTable TablaStocks()
        {
            DataTable Table = Acceso.ObtenerTabla("Stocks","SELECT ID_Stock, ID_Local, ID_Articulo, Cantidad from Stocks");

            return Table;

        }
    }
}
