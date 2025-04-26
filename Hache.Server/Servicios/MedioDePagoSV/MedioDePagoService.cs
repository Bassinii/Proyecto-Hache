using Hache.Server.DAO;
using Hache.Server.Entities;
using System.Data;

namespace Hache.Server.Servicios.MedioDePagoSV
{
    public class MedioDePagoService : IMedioDePagoService
    {
        private readonly DaoMedioDePago _DaoMedioDePago;

        public MedioDePagoService(AccesoDB accesoDB)
        {
            _DaoMedioDePago = new DaoMedioDePago(accesoDB);
        }

        public List<MedioDePago> ObtenerTodosLosMediosDePago()
        {
            DataTable tablaMedioDePago = _DaoMedioDePago.tablaMediosDePago();
            List<MedioDePago> mediosDePago = new List<MedioDePago>();

            foreach (DataRow row in tablaMedioDePago.Rows)
            {

                MedioDePago medioDePago = new MedioDePago
                {
                    ID_MedioDePago = (int)row["ID_MedioDePago"],

                    Nombre = row["Nombre"]?.ToString() ?? string.Empty,
                };
                mediosDePago.Add(medioDePago);
            }
            return mediosDePago;

        }

        public MedioDePago AgregarMedioDePago(MedioDePago medioDePago)
        {
            _DaoMedioDePago.AgregarMedioDePago(medioDePago);
            return medioDePago;
        }

        public void BajaMedioDePago(int idMedioDePago)
        {
            _DaoMedioDePago.BajaMedioDePago(idMedioDePago);
        }

        public MedioDePago ObetenerMedioDePagoPorId(int idMedioDePago)
        {
            DataTable tabla = _DaoMedioDePago.ObtenerMedioDePagoPorId(idMedioDePago);

            if (tabla.Rows.Count == 0)
                return null;

            DataRow fila = tabla.Rows[0];

            return new MedioDePago
            {
                ID_MedioDePago = Convert.ToInt32(fila["ID_MedioDePago"]),
                Nombre = fila["Nombre"].ToString()
            };
        }
    }
}
