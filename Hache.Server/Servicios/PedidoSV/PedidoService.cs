using Hache.Server.DAO;
using Hache.Server.Entities;
using System.Data;
using Microsoft.Data.SqlClient;

namespace Hache.Server.Servicios.PedidoSV
{
    public class PedidoService : IPedidoService
    {
        private readonly DaoPedidos _DaoPedidos;

        public PedidoService(AccesoDB _accesoDB)
        {
            _DaoPedidos = new DaoPedidos(_accesoDB);
        }

        public List<Pedido> ObtenerTodosLosPedidos()
        {
            DataTable TablaPedidos = _DaoPedidos.tablaPedidos();
            List<Pedido> pedido = new List<Pedido>();

            foreach (DataRow row in TablaPedidos.Rows)
            {
                Pedido pedidonuevo = new Pedido()
                {
                    ID_Pedido = (int)row["ID_Pedido"],
                    ID_Local = (int)row["ID_Local"],
                    Fecha = (DateTime)row["Fecha"],
                    Estado = (string)row["Estado"],
                    FechaEntrega = row["Fecha_Entrega"] != DBNull.Value ? Convert.ToDateTime(row["Fecha_Enrega"]) : null,





                };
                pedido.Add(pedidonuevo);
                
            }
            return pedido;
        }
    }
}
