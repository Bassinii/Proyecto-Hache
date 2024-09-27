namespace Hache.Server.Entities
{
    public class HistorialPrecios
    {
        public int ID_HistorialPrecios { get; set; }
        public Articulo Articulo { get; set; } = new Articulo();
        public decimal PrecioAnterior { get; set; }
        public decimal PrecioNuevo { get; set; }
        public DateTime FechaCambio { get; set; } = DateTime.Now;

        public HistorialPrecios() { }
    }
}
