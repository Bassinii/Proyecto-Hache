using Microsoft.Identity.Client;

namespace Hache.Server.Entities
{
    public class DetalleVenta
    {
        public int ID_DetalleVenta { get; set; }
        public int ID_Venta { get; set; }
        public Articulo Articulo { get; set; } = new Articulo();
        public int Cantidad { get; set; }
        public float PrecioUnitario { get; set; }
        public float PorcentajeDescuento { get; set; }

        public DetalleVenta() { }

    }
}
