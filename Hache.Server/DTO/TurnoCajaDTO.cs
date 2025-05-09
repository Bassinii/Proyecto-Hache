namespace Hache.Server.DTO
{
    //Este DTO es para poder realizar el cierre del TurnoCaja.
    public class TurnoCajaDTO
    {
        public int idTurnoCaja { get; set; }
        public decimal montoRetiro { get; set; }
        public decimal montoCierre { get; set; }
        public DateTime fechaCierre { get; set; }

        public string Observacion { get; set; }

    }
}
