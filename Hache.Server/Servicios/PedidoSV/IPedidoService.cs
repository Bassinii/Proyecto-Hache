using Hache.Server.Entities;

namespace Hache.Server.Servicios.PedidoSV
{
    public interface IPedidoService
    {
        List<Pedido> ObtenerTodosLosPedidos();

        List<Pedido> ObtenerPedidoPorId(int id);    

        List<Pedido> ObtenerPedidoPorFecha(DateTime FechaPedido);

        public Pedido CargarPedido(Pedido nuevoPedido);

        public void editarPedidoPorId(int idPedido, string estado, string fechaEntrega);
    }
}
