namespace Hache.Server.Entities
{
    public class HistorialPrecios
    {
        public int ID_HistorialPrecios { get; set; }
        public int ID_Articulo { get; set; }
        public float PrecioAnterior { get; set; }
        public float PrecioNuevo { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;

        public HistorialPrecios() { }
    }
}
