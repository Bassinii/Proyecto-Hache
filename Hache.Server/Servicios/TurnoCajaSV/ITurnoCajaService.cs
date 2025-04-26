using Hache.Server.Entities;
using System.Data;

namespace Hache.Server.Servicios.TurnoCajaSV
{
    public interface ITurnoCajaService
    {
        public void AbrirTurnoCaja(TurnoCaja turnoCaja);
        public void CerrarTurnoCaja(int idTurnoCaja, DateTime fechaCierre, decimal montoCierre, decimal montoRetiro);
        public DataTable ObtenerTurnoCajasAbiertas();
        public DataTable ObtenerTurnoCajaPorId(int idTurnoCaja);
    }
}
