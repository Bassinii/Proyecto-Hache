using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoStocks
    {

        AccesoDB Acceso = new AccesoDB();

        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoStocks(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        public DataTable tablaStocks()
        {
            string consulta = ("SELECT ID_Stock, ID_Local, ID_Articulo, Cantidad from Stocks");
            return _accesoDB.ObtenerTabla("Stocks", consulta);
        }
    }
}
