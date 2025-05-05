namespace Hache.Server.DTO
{
    public class ArticuloDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string CodigoXubio { get; set; }
        public decimal Precio { get; set; }
        public CategoriaDTO Categoria { get; set; }
        public MarcaDTO Marca { get; set; }
    }

    public class CategoriaDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
    }

    public class MarcaDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
    }

}
