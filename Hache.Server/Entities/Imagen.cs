namespace Hache.Server.Entities
{
    public class Imagen
    {
        public int ID_Imagen { get; set; }
        public int ID_Articulo{ get; set; }
        public string url { get; set; } = string.Empty;

        public Imagen() { }
    }
}
