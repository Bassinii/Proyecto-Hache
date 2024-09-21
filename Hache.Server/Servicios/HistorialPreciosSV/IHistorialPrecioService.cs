using Hache.Server.Entities;

namespace Hache.Server.Servicios.HistorialPreciosSV
{
    public interface IHistorialPrecioService
    {
        List<HistorialPrecios> ObtenerTodosLosHistorialPrecios();

        List<HistorialPrecios> ObtenerHistorialPrecioPorIdArticulo(int idArticulo);
    }
}
