using Hache.Server.Entities;
using Hache.Server.Servicios.HistorialPreciosSV;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hache.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HistorialCajaController: ControllerBase
    {
        private readonly IHistorialCaja historialCajaService;

        public HistorialCajaController(IHistorialCaja historialCajaService_)
        {
            historialCajaService = historialCajaService_;
        }

        [HttpGet]
        
        public ActionResult<List<HistorialCaja>> getHistorialCaja(int idLocal)
        {
            try
            {
                List<HistorialCaja> Historial = historialCajaService.ObtenerHistorialCaja(idLocal);
                return Historial;
            }
            catch (Exception ex)
            {
                // Manejo de errores y retorno de mensaje adecuado
                return StatusCode(500, $"Error al obtener el historial: {ex.Message}");
            }
        }

        [HttpPost]
        public IActionResult AgregarGasto([FromBody] HistorialCaja historial)
        {
            try
            {
                if (historial == null)
                {
                    return BadRequest("El objeto historial es nulo.");
                }

                historialCajaService.agregarGasto(historial);
                return Ok(new { mensaje = "Gasto agregado correctamente al historial de caja." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al agregar el gasto: {ex.Message}");
            }
        }
    }
}
