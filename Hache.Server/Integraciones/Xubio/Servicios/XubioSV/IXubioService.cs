using Hache.Server.Integraciones.Xubio.DTO;

namespace Hache.Server.Integraciones.Xubio.Servicios.XubioSV
{
    public interface IXubioService
    {
        public Task<string> ObtenerAccessTokenAsync();
        public Task<bool> CrearComprobanteVentaAsync(ComprobanteVentaDTO dto);
    }
}
