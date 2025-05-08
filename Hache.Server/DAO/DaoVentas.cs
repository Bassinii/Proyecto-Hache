using Hache.Server.DTO;
using Hache.Server.Entities;
using Microsoft.Data.SqlClient;
using System;
using System.Data;
using Hache.Server.DAO;

namespace Hache.Server.DAO
{
    public class DaoVentas
    {

        private readonly AccesoDB _accesoDB;
        private readonly DaoDetalleVenta daoDetalleVenta;
        private readonly DaoStocks daoStocks;

        // Inyección de dependencias de AccesoDB
        public DaoVentas(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
            daoDetalleVenta = new DaoDetalleVenta(accesoDB);
            daoStocks = new DaoStocks(accesoDB);
        }

        public DataTable TablaVentas()
        {
            string consulta = ("SELECT ID_Venta, ID_Usuario, Fecha, Hora, Subtotal, Total, EsPedidosYa, ID_Local, ID_MedioDePago, TransaccionIdXubio from Ventas WHERE ActivoVenta = 1");
            return _accesoDB.ObtenerTabla("Ventas", consulta);
        }
        public DataTable ObtenerVentaPorId(int idVenta)
        {
            // Consulta parametrizada para evitar inyecciones de SQL

            string consulta = "SELECT ID_Venta, ID_Usuario, Fecha, Hora, Subtotal, Total, EsPedidosYa, ID_Local, ID_MedioDePago, TransaccionIdXubio \r\nFROM Ventas \r\nWHERE ID_Venta = @ID_venta AND ActivoVenta = 1;";


            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Venta", SqlDbType.Int) { Value = idVenta }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("Ventas", consulta, parametros);
        }

        public DataTable ObtenerVentaPorFecha(DateTime fechaVenta)
        {
            string consulta = "SELECT ID_Venta, ID_Usuario, Fecha, Hora, Subtotal, Total, EsPedidosYa, ID_Local, ID_MedioDePago, TransaccionIdXubio \r\nFROM Ventas \r\nWHERE CONVERT(date, Fecha) = @Fecha AND ActivoVenta = 1;\r\n";


            SqlParameter[] parametros = new SqlParameter[]
           {
                new SqlParameter("@Fecha", SqlDbType.Date) { Value = fechaVenta.Date }
           };

            return _accesoDB.ObtenerTabla("Ventas", consulta, parametros);

        }

        public void AgregarVenta(Venta venta)
        {
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Usuario",  SqlDbType.Int) { Value =  venta.ID_Usuario },
                new SqlParameter("@Fecha", SqlDbType.DateTime) { Value = venta.Fecha },
                new SqlParameter("@Subtotal", SqlDbType.Decimal) { Value = venta.Subtotal },
                new SqlParameter("@Total", SqlDbType.Decimal) { Value = venta.Total},
                new SqlParameter("@EsPedidosYa", SqlDbType.Bit) { Value = venta.EsPedidosYa},
                new SqlParameter("@ID_Local", SqlDbType.Int) { Value = venta.ID_Local},
                new SqlParameter("@ID_MedioDePago", SqlDbType.Int) {Value = venta.ID_MedioDePago},
                new SqlParameter("@TransaccionIdXubio", SqlDbType.Int) {Value = venta.TransaccionIdXubio}

            };

            _accesoDB.EjecutarComando("INSERT INTO Ventas (ID_Usuario, Fecha, Subtotal, Total, EsPedidosYa, ID_Local, ID_MedioDePago, TransaccionIdXubio, ActivoVenta) " +
                      "VALUES(@ID_Usuario, @Fecha, @Subtotal, @Total, @EsPedidosYa, @ID_Local, @ID_MedioDePago, @TransaccionIdXubio, 1)", parametros);

        }

        public void AgregarVentaConDetalles(Venta venta, List<DetalleVenta> detalles)
        {
            using (SqlConnection connection = new SqlConnection(_accesoDB.ObtenerCadenaConexion()))
            {
                // Abrir la conexión
                connection.Open();

                // Iniciar la transacción
                SqlTransaction transaction = connection.BeginTransaction();

                try
                {
                    // 1. Insertar la venta y obtener el ID de la venta recién insertada
                    string insertVentaQuery = "INSERT INTO Ventas (ID_Usuario, Fecha, Subtotal, Total, EsPedidosYa, ID_Local, ID_MedioDePago, TransaccionIdXubio, ActivoVenta) " +
                                              "VALUES (@ID_Usuario, @Fecha, @Subtotal, @Total, @EsPedidosYa, @ID_Local, @ID_MedioDePago, @TransaccionIdXubio, 1); " +
                                              "SELECT SCOPE_IDENTITY();";  // Obtener el último ID insertado

                    SqlParameter[] parametrosVenta = new SqlParameter[]
                    {
                        new SqlParameter("@ID_Usuario", SqlDbType.Int) { Value = venta.ID_Usuario },
                        new SqlParameter("@Fecha", SqlDbType.DateTime) { Value = venta.Fecha },
                        new SqlParameter("@Subtotal", SqlDbType.Decimal) { Value = venta.Subtotal },
                        new SqlParameter("@Total", SqlDbType.Decimal) { Value = venta.Total },
                        new SqlParameter("@EsPedidosYa", SqlDbType.Bit) { Value = venta.EsPedidosYa },
                        new SqlParameter("@ID_Local", SqlDbType.Int) { Value = venta.ID_Local },
                        new SqlParameter("@ID_MedioDePago", SqlDbType.Int) { Value = venta.ID_MedioDePago },
                        new SqlParameter("@TransaccionIdXubio", SqlDbType.Int) { Value = venta.TransaccionIdXubio }
                    };

                    // Ejecutar la consulta y obtener el ID de la venta
                    SqlCommand cmdVenta = new SqlCommand(insertVentaQuery, connection, transaction);
                    cmdVenta.Parameters.AddRange(parametrosVenta);
                    int idVenta = Convert.ToInt32(cmdVenta.ExecuteScalar());

                    // 2. Asignar el ID de la venta a cada detalle de venta
                    foreach (var detalle in detalles)
                    {
                        detalle.ID_Venta = idVenta; // Asignamos el ID de la venta a cada detalle
                        daoStocks.DescontarStockTransaccional(detalle.ID_Articulo, venta.ID_Local, detalle.Cantidad, connection, transaction);
                    }

                    // 3. Insertar los detalles de la venta usando el método AgregarDetallesDeVenta
                    DaoDetalleVenta daoDetalleVenta = new DaoDetalleVenta(_accesoDB);
                    daoDetalleVenta.AgregarDetallesDeVenta(detalles, connection, transaction);

                    // Confirmar la transacción
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    // En caso de error, revertir la transacción
                    transaction.Rollback();
                    Console.WriteLine("Error: " + ex.Message);
                    throw;
                }
            }
        }




        public void BajaVenta(int idVenta)
        {
            string consulta = "UPDATE Ventas SET ActivoVenta = 0 WHERE ID_Venta = @ID_Venta";
            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
            new SqlParameter("@ID_Venta", SqlDbType.Int) { Value = idVenta }
            };
            _accesoDB.EjecutarComando(consulta, parametros);    
            
        }

        public DataTable ObtenerVentaPorMP(int idMedioPago)
        {
            string consulta = "SELECT  ID_Venta, ID_Usuario, Fecha, Hora, Subtotal, Total, EsPedidosYa, ID_Local, ID_MedioDePago, TransaccionIdXubio \r\nFROM Ventas \r\nWHERE @ID_MedioPago = ID_MedioDePago AND ActivoVenta = 1";

            SqlParameter[] parametros = new SqlParameter[]
            {
            new SqlParameter("@ID_MedioPago", SqlDbType.Int) { Value = idMedioPago }
            };

            return _accesoDB.ObtenerTabla("Ventas", consulta, parametros);

        }
        
        public DataTable ObtenerVentaPorLocal(int idlocal)
        {
            string consulta = "SELECT ID_Venta, ID_Usuario, Fecha, Hora, Subtotal, Total, EsPedidosYa, ID_Local, ID_MedioDePago, TransaccionIdXubio \r\nFROM Ventas \r\nWHERE ID_Local = @ID_Local AND ActivoVenta = 1 ";

            SqlParameter[] parametros = new SqlParameter[]
            {
            new SqlParameter("@ID_Local", SqlDbType.Int) { Value = idlocal }
            };

            return _accesoDB.ObtenerTabla("Ventas", consulta, parametros);
        }
    }

}
