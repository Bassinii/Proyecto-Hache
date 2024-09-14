using Hache.Server.Entities;

namespace Hache.Server.Servicios.Articulos
{
    public interface IArticuloService
    {
        List<Articulo> ObtenerTodosLosArticulos();
       // Articulo ObtenerArticuloPorId(int id);
    }
}
