using Microsoft.Identity.Client;

namespace Hache.Server.Entities
{
    public class DetalleVenta
    {
        public int ID_Detalle { get; set; }
        public int ID_Venta { get; set; }
        public int ID_Articulo { get; set; }
        public int Cantidad { get; set; }
        public decimal Precio_Unitario { get; set; }
        public decimal Porcentaje_Descuento { get; set; }

        public DetalleVenta() { }

    }
}
