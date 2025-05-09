using Hache.Server.DAO;
using Hache.Server.Entities;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Hache.Server.Servicios.TurnoCajaSV
{
    public class TurnoCajaService : ITurnoCajaService
    {
        private readonly DaoTurnoCaja _daoTurnoCaja;
        private readonly DaoHistorialCaja _daoHistorialCaja;

        public TurnoCajaService(AccesoDB accesoDB)
        {
            _daoTurnoCaja = new DaoTurnoCaja(accesoDB);
            _daoHistorialCaja = new DaoHistorialCaja(accesoDB);
        }

        public int AbrirTurnoCaja(TurnoCaja turnoCaja)
        {
            int idTurnoCaja = _daoTurnoCaja.AbrirTurnoCaja(turnoCaja);

            var historial = new HistorialCaja
            {
                ID_TurnoCaja = idTurnoCaja,
                ID_Usuario = turnoCaja.ID_Usuario,
                ID_Local = turnoCaja.ID_Local,
                TipoMovimiento = "Apertura",
                Monto = turnoCaja.MontoApertura,
                Fecha = turnoCaja.FechaApertura
            };

            _daoHistorialCaja.AgregarHistorialCaja(historial);

            return idTurnoCaja;
        }

        public void CerrarTurnoCaja(int idTurnoCaja, DateTime fechaCierre, decimal montoCierre, decimal montoRetiro)
        {
            _daoTurnoCaja.CerrarTurnoCaja(idTurnoCaja, fechaCierre, montoCierre, montoRetiro);

            TurnoCaja turnoCaja = _daoTurnoCaja.ObtenerTurnoCajaObjetoPorId(idTurnoCaja);

            var historial = new HistorialCaja
            {
                ID_TurnoCaja = idTurnoCaja,
                ID_Usuario = turnoCaja.ID_Usuario,
                ID_Local = turnoCaja.ID_Local,
                TipoMovimiento = "Cierre",
                Monto = montoCierre,
                Fecha = fechaCierre
            };
            _daoHistorialCaja.AgregarHistorialCaja(historial);

            if (montoRetiro > 0)
            {
                var retiro = new HistorialCaja
                {
                    ID_TurnoCaja = idTurnoCaja,
                    ID_Usuario = turnoCaja.ID_Usuario,
                    ID_Local = turnoCaja.ID_Local,
                    TipoMovimiento = "Retiro",
                    Monto = montoRetiro,
                    Fecha = fechaCierre
                };

                _daoHistorialCaja.AgregarHistorialCaja(retiro);
            }
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
