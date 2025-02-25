namespace Hache.Server.Entities
{
    public class Venta
    {
        public int ID_Venta { get; set; }
        public Usuario ID_Usuario { get; set; } = new Usuario();
        public int ID_MedioDePago { get; set; }
        public DateTime Fecha { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Total { get; set; }
        public bool EsPedidosYa { get; set; }
        public Local Local { get; set; } = new Local();
        public List<DetalleVenta> DetalleVenta { get; set; } = new List<DetalleVenta>();
        public Venta() { }

    }
}
