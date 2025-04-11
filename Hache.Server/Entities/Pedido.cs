namespace Hache.Server.Entities
{
    public class Pedido
    {
        public int ID_Pedido { get; set; }
        public int ID_TipoPedido { get; set; }
        public int ID_Local { get; set; }
        public DateTime Fecha{ get; set;} = DateTime.Now;
        public string Estado { get; set; } = string.Empty;
        public DateTime? FechaEntrega { get; set; } = DateTime.Now;
        public List<DetallePedido> ListDetallePedido { get; set; } = new List<DetallePedido>();
        public List<DiaTipoPedido>? Dias { get; set; }

        public Pedido() { }

    }
}
