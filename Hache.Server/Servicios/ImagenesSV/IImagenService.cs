using Hache.Server.Entities;

namespace Hache.Server.Servicios.ImagenesSV
{
    public interface IImagenService
    {
        List<Imagen> ObtenerTodasLasImagenes();
    }
}
