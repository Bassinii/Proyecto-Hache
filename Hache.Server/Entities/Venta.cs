namespace Hache.Server.Entities
{
    public class Venta
    {
        public int ID_Venta { get; set; }
        public Usuario Usuario { get; set; } = new Usuario();
        public DateTime Fecha { get; set; }
        public float Subtotal { get; set; }
        public float Total { get; set; }
        public bool EsPedidosYa { get; set; }
        public Local Local { get; set; } = new Local(); 
        public Venta() { }

    }
}
