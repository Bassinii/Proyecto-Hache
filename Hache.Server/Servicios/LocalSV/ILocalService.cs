using Hache.Server.Entities;

namespace Hache.Server.Servicios.LocalSV
{
    public interface ILocalService
    {
        List<Local> ObtenerTodosLosLocales();

        public void BajaLocal(int idLocal);

        public Local AgregarLocal(Local local);
    }
}
