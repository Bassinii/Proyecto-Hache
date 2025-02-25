using Hache.Server.Entities;

namespace Hache.Server.Servicios.MedioDePagoSV
{
    public interface IMedioDePagoService
    {
        List<MedioDePago> ObtenerTodosLosMediosDePago();

        public MedioDePago AgregarMedioDePago(MedioDePago medioDePago);

        public void BajaMedioDePago(int idMedioDePago);
    }
}
