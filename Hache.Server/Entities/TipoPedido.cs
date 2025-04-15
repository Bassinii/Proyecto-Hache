namespace Hache.Server.Entities
{
    public class TipoPedido
    {
        public int ID_TipoPedido { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public List<DiaTipoPedido>? Dias { get; set; }
        public string URL_Imagen { get; set; } = string.Empty;
    }
}
