using Hache.Server.Entities;

namespace Hache.Server.Servicios.MarcaSV
{
    public interface IMarcaService
    {
        List<Marca> ObtenerTodasLasMarcas();

        public Marca AgregarMarca(Marca marca);

        public void BajaMarca(int idMarca);
    }
}
