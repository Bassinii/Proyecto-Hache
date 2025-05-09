using Hache.Server.Entities;
using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoHistorialCaja
    {
        private readonly AccesoDB _accesoDB;

        public DaoHistorialCaja(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        public DataTable ObtenerHistorialCaja()
        {
            string consulta = "SELECT ID_HistorialCaja, ID_TurnoCaja, ID_Usuario, ID_Local, TipoMovimiento, Monto, Fecha FROM HistorialCaja";

             return _accesoDB.ObtenerTabla("HistorialCaja", consulta);
        }

        public void AgregarHistorialCaja(HistorialCaja historial)
        {
            SqlParameter[] parametros = new SqlParameter[]
             {
                new SqlParameter("@ID_TurnoCaja", SqlDbType.Int) { Value = historial.ID_TurnoCaja },
                new SqlParameter("@ID_Usuario", SqlDbType.Int) { Value = historial.ID_Usuario },
                new SqlParameter("@ID_Local", SqlDbType.Int) { Value = historial.ID_Local },
                new SqlParameter("@TipoMovimiento", SqlDbType.NVarChar, 50) { Value = historial.TipoMovimiento },
                new SqlParameter("@Monto", SqlDbType.Decimal) { Value = historial.Monto},
                new SqlParameter("@Fecha", SqlDbType.DateTime) { Value = historial.Fecha },
            };

            _accesoDB.EjecutarComando("INSERT INTO HistorialCaja (ID_TurnoCaja, ID_Usuario, ID_Local, TipoMovimiento, Monto, Fecha) " 
                + "VALUES (@ID_TurnoCaja, @ID_Usuario, @ID_Local, @TipoMovimiento, @Monto, @Fecha)", parametros);

        }
    }
}

