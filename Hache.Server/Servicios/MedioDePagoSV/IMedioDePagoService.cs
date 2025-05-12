using Hache.Server.Entities;
using Microsoft.Identity.Client;

namespace Hache.Server.Servicios.MedioDePagoSV
{
    public interface IMedioDePagoService
    {
        List<MedioDePago> ObtenerTodosLosMediosDePago();

        List<MedioDePago> ObtenerTodosLosMediosDePagoEInactivos();

        public MedioDePago AgregarMedioDePago(MedioDePago medioDePago);

        public void BajaMedioDePago(int idMedioDePago);

        public MedioDePago ObetenerMedioDePagoPorId(int idMedioDePago);
    }
}
