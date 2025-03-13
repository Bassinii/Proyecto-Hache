using Hache.Server.Entities;

namespace Hache.Server.Servicios.VentaSV
{
    public interface IVentaService
    {
        List<Venta> ObtenerTodasLasVentas();

        List<Venta> ObtenerVentaPorIdVenta(int IdVenta);

        List<Venta> ObtenerVentaPorFecha(DateTime fechaVenta);

        List<Venta> ObtenerVentaPorMP(int idMedioPago);

        public Venta CargarVenta(Venta NuevaVenta);

        public void BajaVenta(int idVenta);

       
    }
}

