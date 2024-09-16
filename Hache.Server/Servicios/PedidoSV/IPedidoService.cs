using Hache.Server.Entities;

namespace Hache.Server.Servicios.PedidoSV
{
    public interface IPedidoService
    {
        List<Pedido> ObtenerTodosLosPedidos();
    }
}
