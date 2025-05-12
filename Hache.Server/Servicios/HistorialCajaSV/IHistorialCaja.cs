using Hache.Server.Entities;

namespace Hache.Server.Servicios.HistorialPreciosSV
{
    public interface IHistorialCaja
    {
        List<HistorialCaja> ObtenerHistorialCaja(int idLocal);

        public void agregarGasto(HistorialCaja historial);
    }
}
