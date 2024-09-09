using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class AccesoVentas
    {
        AccesoDB Acceso = new AccesoDB();

        public DataTable TablaVentas()
        {
            DataTable Table = Acceso.ObtenerTabla("Ventas","SELECT ID_Venta, ID_Usuario, Fecha, Hora, Subtotal, Total, EsPedidosYa, ID_Local from Ventas");

            return Table;
        }
    }
}
