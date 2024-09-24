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
            string consulta = "SELECT ID_Pedido, ID_Local, Fecha, Estado, Fecha_Entrega FROM Pedidos";
            return _accesoDB.ObtenerTabla("Pedidos", consulta);
        }
        public DataTable ObtenerPedidosPorId(int idPedido)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_Pedido, ID_Local, Fecha, Estado, Fecha_Entrega FROM Pedidos  WHERE ID_Pedido = @ID_Pedido";
       
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
            string consulta = " SELECT ID_Pedido, ID_Local, Fecha, Estado, Fecha_Entrega FROM Pedidos WHERE CONVERT(date, Fecha) = @Fecha";

            SqlParameter[] parametros = new SqlParameter[]
           {
                new SqlParameter("@Fecha", SqlDbType.Date) { Value = fechaPedido.Date }
           };

            return _accesoDB.ObtenerTabla("Pedidos", consulta, parametros);

        }

    }
}
