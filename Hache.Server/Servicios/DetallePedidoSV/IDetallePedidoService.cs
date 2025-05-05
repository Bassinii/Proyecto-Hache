using Hache.Server.Entities;

namespace Hache.Server.Servicios.DetallePedidoSV
{
    public interface IDetallePedidoService
    {
        public void EditarDetallePedido(int idPedido, List<DetallePedido> detalles);
    }
}
