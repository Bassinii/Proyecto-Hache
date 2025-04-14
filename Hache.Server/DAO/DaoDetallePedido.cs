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
    }
}
