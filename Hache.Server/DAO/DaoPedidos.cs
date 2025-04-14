﻿using Hache.Server.Entities;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoPedidos
    {
        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoPedidos(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        // Método que retorna la tabla de artículos
        public DataTable tablaPedidos()
        {
            string consulta = "SELECT ID_Pedido, ID_TipoPedido, ID_Local, Fecha, Estado, Fecha_Entrega FROM Pedidos";
            return _accesoDB.ObtenerTabla("Pedidos", consulta);
        }
        public DataTable ObtenerPedidosPorId(int idPedido)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_Pedido, ID_TipoPedido, ID_Local, Fecha, Estado, Fecha_Entrega FROM Pedidos  WHERE ID_Pedido = @ID_Pedido";
       
            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Pedido", SqlDbType.Int) { Value = idPedido }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("Pedidos", consulta, parametros);
        }

        public DataTable ObtenerPedidoPorFecha(DateTime fechaPedido)
        {
            string consulta = " SELECT ID_Pedido, ID_TipoPedido, ID_Local, Fecha, Estado, Fecha_Entrega FROM Pedidos WHERE CONVERT(date, Fecha) = @Fecha";

            SqlParameter[] parametros = new SqlParameter[]
           {
                new SqlParameter("@Fecha", SqlDbType.Date) { Value = fechaPedido.Date }
           };

            return _accesoDB.ObtenerTabla("Pedidos", consulta, parametros);

        }

        public void AgregarPedido(Pedido pedido) {

            SqlParameter[] parametros = new SqlParameter[] {
                new SqlParameter("ID_TipoPedido", SqlDbType.Int) { Value = pedido.ID_TipoPedido },
                new SqlParameter("ID_Local", SqlDbType.Int) { Value = pedido.ID_Local},
                new SqlParameter("Fecha", SqlDbType.DateTime) { Value = pedido.Fecha},
                new SqlParameter("Estado", SqlDbType.NVarChar) { Value = pedido.Estado},
                new SqlParameter("Fecha_Entrega", SqlDbType.DateTime) { Value = pedido.FechaEntrega }
            };

            _accesoDB.EjecutarComando("INSERT INTO Pedidos (ID_TipoPedido, ID_Local, Fecha, Estado, Fecha_Entrega) "
                + "VALUES(@ID_TipoPedido, @ID_Local, @Fecha, @Estado, @Fecha_Entrega)", parametros);

        }

        public void AgregarPedidoConDetalles(Pedido pedido, List<DetallePedido> detalles)
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
                    string insertPedidoQuery = "INSERT INTO Pedidos (ID_TipoPedido, ID_Local, Fecha, Estado, Fecha_Entrega) " +
                                              "VALUES (@ID_TipoPedido, @ID_Local, @Fecha, @Estado, @Fecha_Entrega); " +
                                              "SELECT SCOPE_IDENTITY();";  // Obtener el último ID insertado

                    SqlParameter[] parametrosPedido = new SqlParameter[]
                    {
                        new SqlParameter("@ID_TipoPedido", SqlDbType.Int) { Value = pedido.ID_TipoPedido },
                        new SqlParameter("@ID_Local", SqlDbType.Int) { Value = pedido.ID_Local },
                        new SqlParameter("@Fecha", SqlDbType.DateTime) { Value = pedido.Fecha },
                        new SqlParameter("@Estado", SqlDbType.NVarChar) { Value = pedido.Estado },
                        new SqlParameter("@Fecha_Entrega", SqlDbType.DateTime) { Value = pedido.FechaEntrega }
                    };

                    // Ejecutar la consulta y obtener el ID de la venta
                    SqlCommand cmdPedido = new SqlCommand(insertPedidoQuery, connection, transaction);
                    cmdPedido.Parameters.AddRange(parametrosPedido);
                    int idPedido = Convert.ToInt32(cmdPedido.ExecuteScalar());

                    // 2. Asignar el ID de la venta a cada detalle de venta
                    foreach (var detalle in detalles)
                    {
                        detalle.ID_Pedido = idPedido; // Asignamos el ID de la venta a cada detalle
                    }

                    // 3. Insertar los detalles de la venta usando el método AgregarDetallesDeVenta
                    DaoDetallePedido daoDetallePedido = new DaoDetallePedido(_accesoDB);
                    daoDetallePedido.AgregarDetallesDePedido(detalles, connection, transaction);

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

        //NO VAMOS A DESARROLLAS POR AHORA UN BAJA PEDIDO, SINO QUE EN ESTADO VA A ESTAR CANCELADO
        //public void BajaPedido(int idPedido)
        //{
        //    string consulta = "UPDATE Pedidos SET ActivoPedido = 0 WHERE ID_Venta = @ID_Venta";
        //    // Crear el parámetro SQL para filtrar por ID
        //    SqlParameter[] parametros = new SqlParameter[]
        //    {
        //    new SqlParameter("@ID_Pedido", SqlDbType.Int) { Value = idPedido }
        //    };
        //    _accesoDB.EjecutarComando(consulta, parametros);

        //}


    }
}
