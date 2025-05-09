using Hache.Server.Entities;

namespace Hache.Server.Servicios.HistorialPreciosSV
{
    public interface IHistorialCaja
    {
        List<HistorialCaja> ObtenerHistorialCaja();

        public void agregarGasto(HistorialCaja historial);
    }
}
