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
        public DataTable ObtenerDetalleVentaPorId(int idDetalleVenta)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_Detalle, Nombre FROM DetallesVenta  WHERE ID_Detalles = @ID_Detalles";

            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Detalles", SqlDbType.Int) { Value = idDetalleVenta }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("DetallesVenta", consulta, parametros);
        }
    }
}
