﻿namespace Hache.Server.Entities
{
    public class Pedido
    {
        public int ID_Pedido { get; set; }
        public int ID_Local { get; set; }
        public DateTime Fecha{ get; set;} = DateTime.Now;
        public string Estado { get; set; } = string.Empty;
        public DateTime Entrega { get; set; } = DateTime.Now;
        public List<DetallePedido> ListDetallePedido { get; set; } = new List<DetallePedido>();

        public Pedido() { }

    }
}