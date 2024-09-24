using Hache.Server.DAO;
using Hache.Server.Entities;
using System.Data;
using Microsoft.Data.SqlClient;

namespace Hache.Server.Servicios.PedidoSV
{
    public class PedidoService : IPedidoService
    {
        private readonly DaoPedidos _DaoPedidos;
        private readonly DaoDetallePedido _DaoDetallePedido;
     

        public PedidoService(AccesoDB _accesoDB)
        {
            _DaoPedidos = new DaoPedidos(_accesoDB);
            _DaoDetallePedido= new DaoDetallePedido(_accesoDB);
        }

        public List<Pedido> ObtenerTodosLosPedidos()
        {
            DataTable TablaPedidos = _DaoPedidos.tablaPedidos();
            List<Pedido> pedido = new List<Pedido>();

            foreach (DataRow row in TablaPedidos.Rows)
            {
                int idPedido = (int)row["ID_Pedido"];

                Pedido pedidonuevo = new Pedido()
                {
                    ID_Pedido = idPedido,
                    ID_Local = (int)row["ID_Local"],
                    Fecha = (DateTime)row["Fecha"],
                    Estado = (string)row["Estado"],
                    FechaEntrega = row["Fecha_Entrega"] != DBNull.Value ? Convert.ToDateTime(row["Fecha_Entrega"]) : null,

                    ListDetallePedido = _DaoDetallePedido.ObtenerDetallePedidoPorIdLista(idPedido),


                };
                pedido.Add(pedidonuevo);
                
            }
            return pedido;
        }

        public List<Pedido> ObtenerPedidoPorId(int idPedido)
        {
            DataTable TablaPedidos = _DaoPedidos.ObtenerPedidosPorId(idPedido);
            List<Pedido> pedido = new List<Pedido>();

            if (TablaPedidos.Rows.Count > 0)
            {
                foreach (DataRow row in TablaPedidos.Rows)
                {
                    Pedido pedidoNuevo = new Pedido
                    {
                        ID_Pedido = (int)row["ID_Pedido"],
                        ID_Local = (int)row["ID_Local"],
                        Fecha = (DateTime)row["Fecha"],
                        Estado = (string)row["Estado"],
                        FechaEntrega = row["Fecha_Entrega"] != DBNull.Value ? Convert.ToDateTime(row["Fecha_Entrega"]) : null,

                        ListDetallePedido = _DaoDetallePedido.ObtenerDetallePedidoPorIdLista(idPedido),

                    };

                    pedido.Add(pedidoNuevo);
                }  
            }
            return pedido;
        }

        public List<Pedido> ObtenerPedidoPorFecha(DateTime FechaPedido)
        {
            DataTable TablaPedidos = _DaoPedidos.ObtenerPedidoPorFecha(FechaPedido);
            List<Pedido> pedido = new List<Pedido>();

            if (TablaPedidos.Rows.Count > 0)
            {
                foreach (DataRow row in TablaPedidos.Rows)
                {
                    int idPedido = (int)row["ID_Pedido"];

                    Pedido pedidoNuevo = new Pedido
                    {
                        ID_Pedido = idPedido,
                        ID_Local = (int)row["ID_Local"],
                        Fecha = (DateTime)row["Fecha"],
                        Estado = (string)row["Estado"],
                        FechaEntrega = row["Fecha_Entrega"] != DBNull.Value ? Convert.ToDateTime(row["Fecha_Entrega"]) : null,

                        ListDetallePedido = _DaoDetallePedido.ObtenerDetallePedidoPorIdLista(idPedido),

                    };

                    pedido.Add(pedidoNuevo);
                }
            }
            return pedido;

        }
    }
}
