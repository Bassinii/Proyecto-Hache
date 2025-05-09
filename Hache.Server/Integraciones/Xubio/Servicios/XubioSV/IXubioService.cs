using Hache.Server.Integraciones.Xubio.DTO;

namespace Hache.Server.Integraciones.Xubio.Servicios.XubioSV
{
    public interface IXubioService
    {
        public Task<string> ObtenerAccessTokenAsync();
        public Task<T> CrearComprobanteVentaAsync<T>(ComprobanteVentaDTO dto);
        public Task<bool> EliminarComprobanteVentaAsync(long id);
    }
}
