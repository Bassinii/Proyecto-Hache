namespace Hache.Server.Entities
{
    public class DetallePedido
    {
        public int ID_DetallePedido { get; set; }
        public int ID_Pedido { get; set; }
        public int ID_Articulo { get; set; }
        public int Cantidad { get; set; }
        public float Precio_Unitario { get; set; }
        public DetallePedido(){ }
    }
}
