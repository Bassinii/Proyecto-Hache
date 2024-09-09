using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoArticulos
    {
        AccesoDB acceso = new AccesoDB();

        public DataTable TablaArticulos()
        {
            DataTable Table = acceso.ObtenerTabla("Articulos", "SELECT  ID_Articulo, Nombre, Precio_Unitario, ID_Categoria, ID_Marca from Articulos");
            return Table;
        }
    }


}
