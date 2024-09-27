namespace Hache.Server.Entities
{
    public class DetallePedido
    {
        public int ID_DetallePedido { get; set; }
        public int ID_Pedido { get; set; }
        public Articulo Articulo { get; set; } = new Articulo();
        public int Cantidad { get; set; }
        public decimal Precio_Unitario { get; set; }
        public DetallePedido(){ }
    }
}
