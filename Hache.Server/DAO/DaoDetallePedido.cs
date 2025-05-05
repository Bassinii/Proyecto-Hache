using Hache.Server.DTO;
using Hache.Server.Entities;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoDetallePedido
    {
        private readonly AccesoDB _accesoDB;
        private readonly DaoArticulos _DaoArticulos;

        // Inyección de dependencias de AccesoDB
        public DaoDetallePedido(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
            _DaoArticulos = new DaoArticulos(accesoDB);
        }

        // Método que retorna la tabla de artículos
        public DataTable tablaDetallePedido()
        {
            string consulta = "SELECT ID_DetallePedido, ID_Pedido, ID_Articulo, Cantidad, Precio_Unitario FROM DetallesPedidos";
            return _accesoDB.ObtenerTabla("DetallesPedidos", consulta);
        }
        public DataTable ObtenerDetallePedidoPorId(int IdPedido)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_DetallePedido, ID_Pedido, ID_Articulo, Cantidad, Precio_Unitario FROM DetallesPedidos WHERE ID_Pedido = @ID_Pedido";

            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Pedido", SqlDbType.Int) { Value = IdPedido }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("DetallesPedidos", consulta, parametros);
        }

        public List<DetallePedido> ObtenerDetallePedidoPorIdLista(int idPedido)
        {
            DataTable dataTable = ObtenerDetallePedidoPorId(idPedido);

            List<DetallePedido> Detalle = new List<DetallePedido>();

            foreach (DataRow row in dataTable.Rows)
            {

                DetallePedido detallePedido = new DetallePedido
                {
                    ID_DetallePedido = (int)row["ID_DetallePedido"],

                    ID_Pedido = (int)row["ID_Pedido"],

                    ID_Articulo = (int)row["ID_Articulo"],

                    Cantidad = (int)row["Cantidad"],

                    Precio_Unitario = row["Precio_Unitario"] != DBNull.Value
                         ? Convert.ToDecimal(row["Precio_Unitario"])
                         : 0m,  
                };

                Detalle.Add(detallePedido);
            }
            return Detalle;
        }

        public void AgregarDetallesDePedido(List<DetallePedido> detalles, SqlConnection connection, SqlTransaction transaction)
        {
            string consulta = "INSERT INTO DetallesPedidos(ID_Pedido, ID_Articulo, Cantidad, Precio_Unitario) " +
                              "VALUES (@ID_Pedido, @ID_Articulo, @Cantidad, @Precio_Unitario)";

            foreach (DetallePedido detalle in detalles)
            {
                SqlParameter[] parametros = new SqlParameter[]
                {
                    new SqlParameter ("@ID_Pedido", SqlDbType.Int) { Value = detalle.ID_Pedido },
                    new SqlParameter ("@ID_Articulo", SqlDbType.Int) { Value = detalle.ID_Articulo},
                    new SqlParameter ("@Cantidad", SqlDbType.Int) { Value = detalle.Cantidad },
                    new SqlParameter ("@Precio_Unitario", SqlDbType.Decimal) { Value = detalle.Precio_Unitario }
                };

                SqlCommand cmd = new SqlCommand(consulta, connection, transaction);
                cmd.Parameters.AddRange(parametros);
                cmd.ExecuteNonQuery();
            }
        }

        public void EditarDetallePedido(int idPedido, List<DetallePedido> detalles)
        {
            try
            {
                using (SqlConnection connection = _accesoDB.ObtenerConexion())
                using (SqlCommand cmd = new SqlCommand("EditarDetallesPedido", connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter("@ID_Pedido", SqlDbType.Int) { Value = idPedido });

                    DataTable detalleTable = new DataTable();
                    detalleTable.Columns.Add("ID_DetallePedido", typeof(int));
                    detalleTable.Columns.Add("ID_Pedido", typeof(int));
                    detalleTable.Columns.Add("ID_Articulo", typeof(int));
                    detalleTable.Columns.Add("Cantidad", typeof(int));
                    detalleTable.Columns.Add("Precio_Unitario", typeof(decimal));

                    foreach (var det in detalles)
                    {
                        detalleTable.Rows.Add(det.ID_DetallePedido, det.ID_Pedido, det.ID_Articulo, det.Cantidad, det.Precio_Unitario);
                    }

                    SqlParameter tvpParam = cmd.Parameters.AddWithValue("@NuevosDetalles", detalleTable);
                    tvpParam.SqlDbType = SqlDbType.Structured;
                    tvpParam.TypeName = "DetallePedidoTipo";

                    if (connection.State != ConnectionState.Open)
                        connection.Open();

                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                // Logueá o lanzá una excepción más detallada si lo necesitás
                throw new Exception("Error al editar los detalles del pedido: " + ex.Message, ex);
            }

        }

    }

}
