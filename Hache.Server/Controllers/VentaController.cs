using Hache.Server.DTO;
using Hache.Server.Entities;
using Hache.Server.Integraciones.Xubio.DTO;
using Hache.Server.Integraciones.Xubio.Servicios.XubioSV;
using Hache.Server.Servicios.VentaSV;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hache.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VentaController : ControllerBase
    {
        private readonly IVentaService _ventaService;
        private readonly IXubioService _xubioService;

        public VentaController(IVentaService ventaService, IXubioService xubioService)
        {
            _ventaService = ventaService;
            _xubioService = xubioService;
        }

        [HttpGet]
        [Authorize]
        public ActionResult<List<Venta>> GetVenta()
        {
            try
            {
                List<Venta> venta = _ventaService.ObtenerTodasLasVentas();
                return venta;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener las ventas: {ex.Message}");
            }

        }


        [HttpGet("id/{idV}")]
        [Authorize]
        public ActionResult<Venta> GetVentaPorId(int idV)
        {
            try
            {
                Venta venta = _ventaService.ObtenerVentaPorIdVenta(idV);
                return venta;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener la venta: {ex.Message}");
            }

        }

        [HttpGet("fecha/{fechaVenta}")]
        [Authorize]
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


        [HttpGet("VentaMedioPago/{idMedioPago}")]
        [Authorize]
        public ActionResult<List<Venta>> GetVentaPorMedioPago(int idMedioPago)
        {
            try
            {
                List<Venta> venta = _ventaService.ObtenerVentaPorMP(idMedioPago);
                return venta;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener la venta: {ex.Message}");
            }

        }

        [HttpGet("VentaPorLocal/{idLocal}")]
        [Authorize]
        public ActionResult<List<Venta>> GetVentaPorLocal(int idLocal)
        {
            try
            {
                List<Venta> venta = _ventaService.ObtenerVentaPorLocal(idLocal);
                return venta;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener la venta: {ex.Message}");
            }
        }

        [HttpGet("ObtenerRecaudacionPorMP")]
        
        public ActionResult<List<RecaudacionMediosDePagoDTO>> ObtenerRecaudacionPorMedioPago(DateTime fecha, int idLocal)
        {
            try
            {
                List<RecaudacionMediosDePagoDTO> recaudacion = _ventaService.ObtenerRecaudacionPorMedioPago(fecha, idLocal);
                return Ok(recaudacion);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener la venta: {ex.Message}");
            }
        }


        [HttpPost]
        [Authorize]
        public ActionResult AgregarVenta([FromBody] Venta nuevaVenta)
        {
            try
            {
                // Llamar al servicio que manejará la transacción
                Venta venta = _ventaService.CargarVenta(nuevaVenta); // Cambia a este método en el servicio que maneja la transacción
                return Ok(venta);
            }
            catch (Exception ex)
            {
                // Manejo de errores y respuesta con código 500
                return StatusCode(500, $"Error al cargar Venta: {ex.Message}");
            }
        }

        [HttpPatch("BajaVenta")]
       
        public ActionResult BajaVenta(int idVenta)
        {
            try
            {
                _ventaService.BajaVenta(idVenta);
                return Ok(new { mensaje = "La venta se ha dado de baja correctamente." });

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}\nStackTrace: {ex.StackTrace}");
                return StatusCode(500, new { mensaje = "Error al obtener las ventas", detalle = ex.Message });
            }
        }

        [HttpPost("Comprobantes")]
        public async Task<IActionResult> CrearComprobante([FromBody] ComprobanteVentaDTO dto)
        {
            try
            {
                var comprobante = await _xubioService.CrearComprobanteVentaAsync<ComprobanteVentaDTO>(dto);

                return StatusCode(200, comprobante);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensaje = "Error al crear comprobante", detalle = ex.Message });
            }
        }

        [HttpDelete("Comprobantes/{id}")]
        public async Task<IActionResult> EliminarComprobanteVenta(long id)
        {
            try
            {
                bool comprobante = await _xubioService.EliminarComprobanteVentaAsync(id);

                if (comprobante)
                    return Ok();
                else
                    return StatusCode(500, new { mensaje = "Error al eliminar el comprobante en Xubio" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensaje = "Error al eliminar el comprobante en Xubio", detalle = ex.Message });
            }
        }

    }
}
