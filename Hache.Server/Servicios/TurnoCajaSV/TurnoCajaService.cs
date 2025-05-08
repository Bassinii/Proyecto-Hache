using Hache.Server.DAO;
using Hache.Server.Entities;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Hache.Server.Servicios.TurnoCajaSV
{
    public class TurnoCajaService : ITurnoCajaService
    {
        private readonly DaoTurnoCaja _daoTurnoCaja;

        public TurnoCajaService(AccesoDB accesoDB)
        {
            _daoTurnoCaja = new DaoTurnoCaja(accesoDB);
        }

        public int AbrirTurnoCaja(TurnoCaja turnoCaja)
        {
           return _daoTurnoCaja.AbrirTurnoCaja(turnoCaja);
        }

        public void CerrarTurnoCaja(int idTurnoCaja, DateTime fechaCierre, decimal montoCierre, decimal montoRetiro)
        {
            _daoTurnoCaja.CerrarTurnoCaja(idTurnoCaja, fechaCierre, montoCierre, montoRetiro);
        }

        public DataTable ObtenerTurnoCajasAbiertas()
        {
            return _daoTurnoCaja.ObtenerTurnoCajasAbiertas();
        }

        public DataTable ObtenerTurnoCajaPorId(int idTurnoCaja)
        {
            return _daoTurnoCaja.ObtenerTurnoCajaPorId(idTurnoCaja);
        }
    }
}
