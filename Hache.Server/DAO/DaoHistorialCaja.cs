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

        public DataTable ObtenerHistorialCaja(int idLocal)
        {
            SqlParameter[] parametros = new SqlParameter[]
            {

            new SqlParameter("@ID_Local", SqlDbType.Int) { Value = idLocal},

            };

            string consulta = "SELECT historial.ID_HistorialCaja, historial.ID_TurnoCaja, historial.ID_Usuario, u.NombreCompleto AS NombreUsuario, historial.ID_Local, historial.TipoMovimiento, historial.Monto, historial.Fecha, historial.Observacion " +
                  "FROM HistorialCaja historial " +
                  "JOIN Usuarios u ON historial.ID_Usuario = u.ID_Usuario " +
                  "WHERE historial.ID_Local = @ID_Local";

            return _accesoDB.ObtenerTabla("HistorialCaja", consulta, parametros);
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
               new SqlParameter("@Observacion", SqlDbType.NVarChar, 500) { Value = (object?)historial.Observacion ?? DBNull.Value },

            };

            _accesoDB.EjecutarComando("INSERT INTO HistorialCaja (ID_TurnoCaja, ID_Usuario, ID_Local, TipoMovimiento, Monto, Fecha, Observacion) " 
                + "VALUES (@ID_TurnoCaja, @ID_Usuario, @ID_Local, @TipoMovimiento, @Monto, @Fecha, @Observacion)", parametros);

        }

    }
}

