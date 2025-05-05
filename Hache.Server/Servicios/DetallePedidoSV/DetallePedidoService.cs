using Hache.Server.DAO;
using Hache.Server.Entities;

namespace Hache.Server.Servicios.DetallePedidoSV
{
    public class DetallePedidoService: IDetallePedidoService
    {
        private readonly DaoDetallePedido _daoDetallePedido;

        public DetallePedidoService(AccesoDB accesoDB)
        {
            _daoDetallePedido = new DaoDetallePedido(accesoDB);
        }

        public void EditarDetallePedido(int idPedido, List<DetallePedido> detalles) {

            _daoDetallePedido.EditarDetallePedido(idPedido, detalles);
        }
    }
}
