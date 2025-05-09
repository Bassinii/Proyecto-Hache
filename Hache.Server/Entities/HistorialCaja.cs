namespace Hache.Server.Entities
{
    public class HistorialCaja
    {
        public int ID_HistorialCaja { get; set; }

        public int ID_TurnoCaja { get; set; }

        public int ID_Usuario { get; set; }

        public int ID_Local { get; set; }

        public string TipoMovimiento { get; set; }

        public decimal Monto { get; set; }

        public DateTime Fecha { get; set; }

        public string? nombreUsuario { get; set; }

        public string? Observacion { get; set; }

    }
}
