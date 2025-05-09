using Hache.Server.DAO;
using Hache.Server.Entities;
using Hache.Server.Servicios.HistorialPreciosSV;
using System.Data;

namespace Hache.Server.Servicios.HistorialCajaSV
{
    public class HistorialCajaService: IHistorialCaja
    {
        private readonly DaoHistorialCaja daoHistorialCaja;

        public HistorialCajaService(AccesoDB accesoDB)
        {
            daoHistorialCaja = new DaoHistorialCaja(accesoDB);
        }

        public List<HistorialCaja> ObtenerHistorialCaja()
        {
            DataTable tabla = daoHistorialCaja.ObtenerHistorialCaja();
            List<HistorialCaja> historialCaja = new List<HistorialCaja>();

            foreach (DataRow row in tabla.Rows)
            {
                HistorialCaja hist = new HistorialCaja
                {
                    ID_HistorialCaja = (int)row["ID_HistorialCaja"],
                    ID_TurnoCaja = (int)row["ID_TurnoCaja"],
                    ID_Local = (int)row["ID_Local"],
                    ID_Usuario = (int)row["ID_Usuario"],
                    TipoMovimiento = (string)row["TipoMovimiento"],
                    Monto = row["Monto"] != DBNull.Value
                         ? Convert.ToDecimal(row["Monto"])
                         : 0m,
                    Fecha = (DateTime)row["Fecha"],

                    nombreUsuario = (string)row["NombreUsuario"]

                };
                historialCaja.Add(hist);
            }
            return historialCaja;
        }
    }

}
