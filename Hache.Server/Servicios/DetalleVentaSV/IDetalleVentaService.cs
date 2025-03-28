using Hache.Server.Entities;
using Hache.Server.DTO;

namespace Hache.Server.Servicios.DetalleVentaSV
{
    public interface IDetalleVentaService
    {
        List<DetalleVentaDTO> ObtenerDetalleVentaPorIdVenta(int idVenta);
    }
}
