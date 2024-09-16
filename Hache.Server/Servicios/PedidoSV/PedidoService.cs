using Hache.Server.DAO;
using Hache.Server.Entities;
using System.Data;

namespace Hache.Server.Servicios.PedidoSV
{
    public class PedidoService : IPedidoService
    {
        private readonly DaoPedidos _DaoPedidos;

        public PedidoService(AccesoDB accesoDB)
        {
            _DaoPedidos = new DaoPedidos(accesoDB);
        }

        public List<Pedido> ObtenerTodosLosPedidos()
        {
            DataTable TablaPedidos = _DaoPedidos.tablaPedidos();
            List<Pedido> pedido = new List<Pedido>();

            foreach (DataRow row in TablaPedidos.Rows)
            {
                Pedido pedidonuevo = new Pedido()
                {
                    ID_Pedido =(int)row["ID_Pedido"],
                    ID_Local = (int)row["ID_Local"],

                };
                pedido.Add(pedidonuevo);
                
            }
            return pedido;
        }
    }
}
