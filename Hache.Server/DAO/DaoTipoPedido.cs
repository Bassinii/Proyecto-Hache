using Microsoft.Data.SqlClient;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoTipoPedido
    {
        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoTipoPedido(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        // Método para obtener todos los tipos de pedido
        public DataTable ObtenerTiposDePedido()
        {
            string consulta = "SELECT ID_TipoPedido,URL_Imagen, Nombre FROM TiposDePedidos";
            return _accesoDB.ObtenerTabla("TiposDePedidos", consulta);
        }

        // Método para obtener los días de un tipo de pedido
        public DataTable ObtenerDiasDeTipoPedido(int idTipoPedido)
        {
            string consulta = "SELECT ID_TipoPedido, DiaSemana FROM DiasTipoPedido WHERE ID_TipoPedido = @ID_TipoPedido";

            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_TipoPedido", SqlDbType.Int) { Value = idTipoPedido }
            };

            return _accesoDB.ObtenerTabla("TipoPedido_Dias", consulta, parametros);
        }

        public DataTable ObtenerTipoPedidoPorID(int idTipoPedido)
        {
            string consulta = "SELECT ID_TipoPedido, URL_Imagen, Nombre FROM TiposDePedidos WHERE ID_TipoPedido = @ID_TipoPedido";

            SqlParameter[] paramentros = new SqlParameter[]
            {
                new SqlParameter("@ID_TipoPedido", SqlDbType.Int) { Value = idTipoPedido }
            };

            return _accesoDB.ObtenerTabla("TiposDePedidos", consulta, paramentros);
        }
    }

}
