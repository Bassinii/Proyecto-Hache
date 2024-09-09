using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoDetalleVenta
    {
        AccesoDB Acceso = new AccesoDB();

        public DataTable TablaDetalleDeVenta()
        {
            DataTable Table = Acceso.ObtenerTabla("DetallesVenta", "SELECT ID_Detalle, ID_Venta, ID_Articulo, Cantidad, Precio_Unitario, Porcentaje_Descuento from DetallesVenta");
            return Table;
        }
    }
}
