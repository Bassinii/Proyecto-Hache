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
    }
}
