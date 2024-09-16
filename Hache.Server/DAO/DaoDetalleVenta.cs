using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoDetalleVenta
    {
        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoDetalleVenta(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        public DataTable tablaDetalleVenta()
        {
            string consulta = ("SELECT ID_Detalle, ID_Venta, ID_Articulo, Cantidad, Precio_Unitario, Porcentaje_Descuento from DetallesVenta");
            return _accesoDB.ObtenerTabla("DetallesVenta", consulta);
        }
    }
}
