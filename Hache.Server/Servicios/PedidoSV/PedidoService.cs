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
                    ID_TipoPedido = (int)row["ID_TipoPedido"],
                    ID_Local = (int)row["ID_Local"],
                    Fecha = (DateTime)row["Fecha"],
                    Estado = (string)row["Estado"],
                    FechaEntrega = row["Fecha_Entrega"] != DBNull.Value ? Convert.ToDateTime(row["Fecha_Entrega"]) : null,

                    DetallePedido = _DaoDetallePedido.ObtenerDetallePedidoPorIdLista(idPedido),


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
                        ID_TipoPedido = (int)row["ID_TipoPedido"],
                        ID_Local = (int)row["ID_Local"],
                        Fecha = (DateTime)row["Fecha"],
                        Estado = (string)row["Estado"],
                        FechaEntrega = row["Fecha_Entrega"] != DBNull.Value ? Convert.ToDateTime(row["Fecha_Entrega"]) : null,

                        DetallePedido = _DaoDetallePedido.ObtenerDetallePedidoPorIdLista(idPedido),

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
                        ID_TipoPedido = (int)row["ID_TipoPedido"],
                        ID_Local = (int)row["ID_Local"],
                        Fecha = (DateTime)row["Fecha"],
                        Estado = (string)row["Estado"],
                        FechaEntrega = row["Fecha_Entrega"] != DBNull.Value ? Convert.ToDateTime(row["Fecha_Entrega"]) : null,

                        DetallePedido = _DaoDetallePedido.ObtenerDetallePedidoPorIdLista(idPedido),

                    };

                    pedido.Add(pedidoNuevo);
                }
            }
            return pedido;

        }

        public Pedido CargarPedido(Pedido nuevoPedido)
        {
            try
            {
                // Llamamos al método AgregarVentaConDetalles de DaoVentas, pasando la venta y sus detalles.
                _DaoPedidos.AgregarPedidoConDetalles(nuevoPedido, nuevoPedido.DetallePedido);

                return nuevoPedido; // Retornamos la venta cargada
            }
            catch (Exception ex)
            {
                // En caso de un error, puedes capturar la excepción y tomar las medidas adecuadas
                Console.WriteLine("Error al cargar el pedido: " + ex.Message);
                throw;
            }
        }

    }
}
