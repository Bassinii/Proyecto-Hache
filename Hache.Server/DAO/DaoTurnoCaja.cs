using Hache.Server.Entities;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoTurnoCaja
    {
        private readonly AccesoDB _accesoDB;

        public DaoTurnoCaja(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        public int AbrirTurnoCaja(TurnoCaja turnoCaja)
        {
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Usuario", SqlDbType.Int) { Value = turnoCaja.ID_Usuario },
                new SqlParameter("@ID_Local", SqlDbType.Int) { Value = turnoCaja.ID_Local },
                new SqlParameter("@FechaApertura", SqlDbType.DateTime) { Value = turnoCaja.FechaApertura },
                new SqlParameter("@MontoApertura", SqlDbType.Decimal) { Value = turnoCaja.MontoApertura }
            };

            object resultado = _accesoDB.EjecutarEscalar(
                "INSERT INTO TurnoCaja (ID_Usuario, ID_Local, FechaApertura, MontoApertura, Abierta) " +
                "VALUES (@ID_Usuario, @ID_Local, @FechaApertura, @MontoApertura, 1); " +
                "SELECT SCOPE_IDENTITY();", parametros 
            );

            return Convert.ToInt32(resultado);
        }                              

        public void CerrarTurnoCaja(int idTurnoCaja, DateTime fechaCierre, decimal montoCierre, decimal montoRetiro)
        {
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_TurnoCaja", SqlDbType.Int) { Value = idTurnoCaja },
                new SqlParameter("@FechaCierre", SqlDbType.DateTime) { Value = fechaCierre },
                new SqlParameter("@MontoRetiro", SqlDbType.Decimal) { Value = montoRetiro},
                new SqlParameter("@MontoCierre", SqlDbType.Decimal) { Value = montoCierre }
            };

            _accesoDB.EjecutarComando("UPDATE TurnoCaja SET FechaCierre = @FechaCierre, MontoCierre = @MontoCierre, Abierta = 0, MontoRetiro = @MontoRetiro WHERE ID_TurnoCaja = @ID_TurnoCaja", parametros);
        }

        public DataTable ObtenerTurnoCajasAbiertas()
        {
            string consulta = "SELECT * FROM TurnoCaja WHERE Abierta = 1";
            return _accesoDB.ObtenerTabla("TurnoCaja", consulta);
        }

        public DataTable ObtenerTurnoCajaPorId(int idTurnoCaja)
        {
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_TurnoCaja", SqlDbType.Int) { Value = idTurnoCaja }
            };

            return _accesoDB.ObtenerTabla("TurnoCaja", "SELECT * FROM TurnoCaja WHERE ID_TurnoCaja = @ID_TurnoCaja", parametros);
        }
    }
}
