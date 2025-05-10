namespace Hache.Server.DTO
{
    public class DetalleVentaDTO
    {
        public int Id { get; set; }
        public int IdVenta { get; set; } 
        public int IdArticulo { get; set; } 
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal PrecioVenta { get; set; }
        public string NombreArticulo { get; set; } = string.Empty;
    }
}
