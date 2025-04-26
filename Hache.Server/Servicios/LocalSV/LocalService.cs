using Hache.Server.DAO;
using Hache.Server.Entities;
using System.Data;
using static System.Net.Mime.MediaTypeNames;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Hache.Server.Servicios.LocalSV
{
    public class LocalService : ILocalService
    {
        private readonly DaoLocales _DaoLocales;

        public LocalService(AccesoDB _accesoDB)
        {
            _DaoLocales = new DaoLocales(_accesoDB);

        }

        public List<Local> ObtenerTodosLosLocales()
        {
            DataTable tablaLocales = _DaoLocales.tablaLocales();
            List<Local> local = new List<Local>();

            foreach (DataRow row in tablaLocales.Rows)
            {
                Local NuevoLocal = new Local
                {
                    ID_Local = (int)row["ID_Local"],

                    Nombre = row["Nombre"]?.ToString() ?? string.Empty,
                };
                local.Add(NuevoLocal);
            }
            return local;

        }

        public void BajaLocal(int idLocal)
        {
            _DaoLocales.BajaLocal(idLocal);
        }

        public Local AgregarLocal(Local local)
        {
            _DaoLocales.AgregarLocal(local);
            return local;
        }

        public Local ObtenerLocalPorId(int idLocal)
        {
            DataTable tabla = _DaoLocales.ObtenerLocalPorId(idLocal);

            if (tabla.Rows.Count == 0)
                return null;

            DataRow fila = tabla.Rows[0];

            return new Local
            {
                ID_Local = Convert.ToInt32(fila["ID_Local"]),
                Nombre = fila["Nombre"].ToString()
            };
        }

    }
}