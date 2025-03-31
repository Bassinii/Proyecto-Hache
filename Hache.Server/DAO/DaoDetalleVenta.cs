using Hache.Server.Entities;
using Microsoft.Data.SqlClient;
using System;
using System.Data;
using static System.Net.Mime.MediaTypeNames;

namespace Hache.Server.DAO
{
    public class DaoDetalleVenta
    {
        private readonly AccesoDB _accesoDB;
        private readonly DaoArticulos _DaoArticulos;
        // Inyección de dependencias de AccesoDB
        public DaoDetalleVenta(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
            _DaoArticulos = new DaoArticulos(accesoDB);

        }

        public DataTable tablaDetalleVenta()
        {
            string consulta = ("SELECT ID_Detalle, ID_Venta, ID_Articulo, Cantidad, Precio_Unitario, Precio_Venta from DetallesVentas");
            return _accesoDB.ObtenerTabla("DetallesVentas", consulta);
        }

        public DataTable ObtenerDetalleVentaPorId(int idDetalleVenta)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_Detalle, Nombre FROM DetallesVentas  WHERE ID_Detalles = @ID_Detalles";

            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Detalles", SqlDbType.Int) { Value = idDetalleVenta }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("DetallesVentas", consulta, parametros);
        }

        public DataTable ObtenerDetalleVentaPorIdVenta(int idVenta)
        {

            string consulta = "SELECT ID_Detalle, ID_Venta, ID_Articulo, Cantidad, Precio_Unitario, Precio_Venta from DetallesVentas  WHERE ID_Venta = @ID_Venta";

            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Venta", SqlDbType.Int) { Value = idVenta }
            };

            return _accesoDB.ObtenerTabla("DetallesVentas", consulta, parametros);
        }

        public List<DetalleVenta> ObtenerDetalleVentaPorIdVentaLista(int idVenta)
        {
            DataTable dataTable = ObtenerDetalleVentaPorIdVenta(idVenta);

            List<DetalleVenta> Detalle = new List<DetalleVenta>();

            foreach (DataRow row in dataTable.Rows)
            {
                int IdArticulo = (int)row["ID_Articulo"];

                DetalleVenta detalleVenta = new DetalleVenta
                {
                    ID_Detalle = (int)row["ID_Detalle"],

                    ID_Venta = (int)row["ID_Venta"],

                    ID_Articulo = (int)row["ID_Articulo"],

                    Cantidad = (int)row["Cantidad"],

                    Precio_Unitario = row["Precio_Unitario"] != DBNull.Value
                         ? Convert.ToDecimal(row["Precio_Unitario"])
                         : 0m,

                    Precio_Venta = row["Precio_Venta"] != DBNull.Value
                         ? Convert.ToDecimal(row["Precio_Venta"])
                         : 0m,
                };

                Detalle.Add(detalleVenta);
            }
            return Detalle;
        }

        public void AgregarDetallesDeVenta(List<DetalleVenta> detalles, SqlConnection connection, SqlTransaction transaction)
        {
            string consulta = "INSERT INTO DetallesVentas (ID_Venta, ID_Articulo, Cantidad, Precio_Unitario, Precio_Venta) " +
                              "VALUES (@ID_Venta, @ID_Articulo, @Cantidad, @Precio_Unitario, @Precio_Venta)";

            foreach (DetalleVenta detalle in detalles)
            {
                SqlParameter[] parametros = new SqlParameter[]
                {
            new SqlParameter ("@ID_Venta", SqlDbType.Int) { Value = detalle.ID_Venta },
            new SqlParameter ("@ID_Articulo", SqlDbType.Int) { Value = detalle.ID_Articulo },
            new SqlParameter ("@Cantidad", SqlDbType.Int) { Value = detalle.Cantidad },
            new SqlParameter ("@Precio_Unitario", SqlDbType.Decimal) { Value = detalle.Precio_Unitario },
            new SqlParameter ("@Precio_Venta", SqlDbType.Decimal) { Value = detalle.Precio_Venta }
                };

                SqlCommand cmd = new SqlCommand(consulta, connection, transaction);
                cmd.Parameters.AddRange(parametros);
                cmd.ExecuteNonQuery();
            }
        }
    }
}
