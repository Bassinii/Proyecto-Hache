using Hache.Server.Entities;

namespace Hache.Server.Servicios.CategoriasSV
{
    public interface ICategoriaService
    {
        List<Categoria> ObtenerTodasLasCategorias();

        public Categoria AgregarCategoria(Categoria categoria);

        public void BajaCategoria(int idCategoria);
    }
}
