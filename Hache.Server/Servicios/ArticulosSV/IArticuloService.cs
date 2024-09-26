using Hache.Server.Entities;

namespace Hache.Server.Servicios.ArticulosSV
{
    public interface IArticuloService
    {
        List<Articulo> ObtenerTodosLosArticulos();

        List<Articulo> ObtenerArticuloPorID(int id);

        public Articulo CargarArticulo(Articulo NuevoArticulo);

        public void ModificarPrecioArticulo(int idArticulo, decimal NuevoPrecio);   

    }
}
