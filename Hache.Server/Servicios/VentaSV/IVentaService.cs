using Hache.Server.Entities;

namespace Hache.Server.Servicios.VentaSV
{
    public interface IVentaService
    {
        List<Venta> ObtenerTodasLasVentas();
    }
}
