using Hache.Server.DAO;
using Hache.Server.Entities;
using System;
using System.Data;

namespace Hache.Server.Servicios.TipoPedidoSV
{
    public class TipoPedidoService:ITipoPedidoService
    {
        private readonly DaoTipoPedido daoTipoPedido;

        public TipoPedidoService(AccesoDB accesoDB)
        {
            daoTipoPedido = new DaoTipoPedido(accesoDB);
        }

        public List<TipoPedido> ObtenerTiposDePedido() 
        {
            DataTable tabla = daoTipoPedido.ObtenerTiposDePedido();
            List<TipoPedido> tipoPedidos = new List<TipoPedido>();

            foreach (DataRow row in tabla.Rows)
            {
                TipoPedido tipoPedidoNuevo = new TipoPedido
                {
                    ID_TipoPedido = (int)row["ID_TipoPedido"],
                    URL_Imagen = row["URL_Imagen"]?.ToString() ?? string.Empty,
                    Nombre = row["Nombre"]?.ToString() ?? string.Empty,
                };
                tipoPedidos.Add(tipoPedidoNuevo);
            }
            return tipoPedidos;
        }

    }
}
