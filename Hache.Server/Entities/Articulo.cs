namespace Hache.Server.Entities
{
    public class Articulo
    {
        public int ID_Articulo { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public decimal Precio { get; set; }
        public Categoria Categoria { get; set; } = new Categoria();
        public Marca Marca { get; set; } = new Marca();
        public List<Imagen> Imagen{ get; set; } = new List<Imagen>();

        public Articulo() { }
    }
}
