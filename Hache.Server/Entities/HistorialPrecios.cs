namespace Hache.Server.Entities
{
    public class HistorialPrecios
    {
        public int ID_HistorialPrecios { get; set; }
        public int ID_Articulo { get; set; }
        public decimal PrecioAnterior { get; set; }
        public decimal PrecioNuevo { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;

        public HistorialPrecios() { }
    }
}
