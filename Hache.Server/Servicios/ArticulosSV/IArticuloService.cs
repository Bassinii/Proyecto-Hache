using Hache.Server.Entities;

namespace Hache.Server.Servicios.ArticulosSV
{
    public interface IArticuloService
    {
        List<Articulo> ObtenerTodosLosArticulos();

        List<Articulo> ObtenerArticuloPorID(int id);
    }
}
