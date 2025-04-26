namespace Hache.Server.Entities
{
    public class TurnoCaja
    {
        public int ID_Caja { get; set; }
        public int ID_Usuario { get; set; }
        public int ID_Local { get; set; }
        public DateTime FechaApertura { get; set; }
        public decimal MontoApertura { get; set; }
        public DateTime? FechaCierre { get; set; }
        public decimal? MontoCierre { get; set; }
        public decimal? MontoRetiro { get; set; }
        public bool Abierta { get; set; }
    }
}
