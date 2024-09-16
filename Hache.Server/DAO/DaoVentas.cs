using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoVentas
    {

        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoVentas(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        public DataTable tablaVentas()
        {
            string consulta = ("SELECT ID_Venta, ID_Usuario, Fecha, Hora, Subtotal, Total, EsPedidosYa, ID_Local from Ventas");
            return _accesoDB.ObtenerTabla("Ventas", consulta);
        }

    }
}
