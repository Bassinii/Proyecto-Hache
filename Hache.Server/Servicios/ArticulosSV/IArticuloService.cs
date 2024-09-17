using Hache.Server.Entities;

namespace Hache.Server.Servicios.ArticulosSV
{
    public interface IArticuloService
    {
        List<Articulo> ObtenerTodosLosArticulos();

       // Articulo ObtenerArticuloPorId(int id);
    }
}
