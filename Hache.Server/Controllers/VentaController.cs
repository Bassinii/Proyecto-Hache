using Hache.Server.Entities;
using Hache.Server.Servicios.VentaSV;
using Microsoft.AspNetCore.Mvc;

namespace Hache.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VentaController : ControllerBase
    {
        private readonly IVentaService _ventaService;

        public VentaController(IVentaService ventaService)
        {
            _ventaService = ventaService;
        }

        [HttpGet]
        public ActionResult<List<Venta>> GetVenta()
        {
            try
            {
                List<Venta> venta =  _ventaService.ObtenerTodasLasVentas();
                return venta;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener las ventas: {ex.Message}");
            }

        }


        [HttpGet("id/{idV}")]
        public ActionResult<List<Venta>> GetVentaPorId(int idV)
        {
            try
            {
                List<Venta> venta = _ventaService.ObtenerVentaPorIdVenta(idV);
                return venta;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener la venta: {ex.Message}");
            }

        }

        [HttpGet("fecha/{fechaVenta}")]
        public ActionResult<List<Venta>> GetVentaPorFecha(DateTime fechaVenta)
        {
            try
            {
                List<Venta> venta = _ventaService.ObtenerVentaPorFecha(fechaVenta);
                return venta;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener la venta: {ex.Message}");
            }

        }

        [HttpPost]
        public ActionResult AgregarVenta([FromBody] Venta nuevaVenta)
        {
            try
            {
                Venta venta = _ventaService.CargarVenta(nuevaVenta);
                return Ok(venta);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al cargar Venta: {ex.Message}");
            }

        }

        [HttpPatch]
        public ActionResult BajaVenta(int idVenta)
        {
            try
            {
                _ventaService.BajaVenta(idVenta);
                return Ok("La venta se ha dado de baja correctamente.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}\nStackTrace: {ex.StackTrace}");
                return StatusCode(500, new { mensaje = "Error al obtener las ventas", detalle = ex.Message });
            }
        }
    }
}
