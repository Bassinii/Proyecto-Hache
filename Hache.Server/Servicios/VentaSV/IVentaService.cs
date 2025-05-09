using Hache.Server.DTO;
using Hache.Server.Entities;

namespace Hache.Server.Servicios.VentaSV
{
    public interface IVentaService
    {
        List<Venta> ObtenerTodasLasVentas();

        Venta ObtenerVentaPorIdVenta(int IdVenta);

        List<Venta> ObtenerVentaPorFecha(DateTime fechaVenta);

        List<Venta> ObtenerVentaPorMP(int idMedioPago);

        List<Venta> ObtenerVentaPorLocal(int idLocal);

        public Venta CargarVenta(Venta NuevaVenta);

        public void BajaVenta(int idVenta);

        List<RecaudacionMediosDePagoDTO> ObtenerRecaudacionPorMedioPago(DateTime fecha);



    }
}

