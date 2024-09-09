using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoHistorialPrecios
    {
        AccesoDB Acceso = new AccesoDB();

        public DataTable TablaHistorialPrecios()
        {
            DataTable Table = Acceso.ObtenerTabla("HistorialPrecios", "SELECT ID_HistorialPrecios, Id_Articulo, Precio_Anterior, Precio_Nuevo, Fecha_Cambio from HistorialPrecios");
            return Table;
        }
    }
}
