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
        public DataTable ObtenerVentaPorId(int idVenta)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_Venta, Nombre FROM Ventas WHERE ID_Venta = @ID_venta";

            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Venta", SqlDbType.Int) { Value = idVenta }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("Ventas", consulta, parametros);
        }
    }
}
