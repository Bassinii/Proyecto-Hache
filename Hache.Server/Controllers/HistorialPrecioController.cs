using Hache.Server.Entities;
using Hache.Server.Servicios.HistorialPreciosSV;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hache.Server.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class HistorialPrecioController : ControllerBase
    {
        private readonly IHistorialPrecioService _historialPrecioService;

        public HistorialPrecioController(IHistorialPrecioService historialPrecioService)
        {
            _historialPrecioService = historialPrecioService;
        }

        [HttpGet]
        [Authorize]
        public ActionResult<List<HistorialPrecios>> GetHistorialPrecios() 
        {

            try
            {
                List<HistorialPrecios> Historial = _historialPrecioService.ObtenerTodosLosHistorialPrecios();
                return Historial;
            }
            catch (Exception ex)
            {
                // Manejo de errores y retorno de mensaje adecuado
                return StatusCode(500, $"Error al obtener el historial: {ex.Message}");
            }


        }

        [HttpGet("{id}")]
        [Authorize]
        public ActionResult<List<HistorialPrecios>> GetHistorialPorIdArticulo(int id)
        {
            try
            {
                List<HistorialPrecios> Historial = _historialPrecioService.ObtenerHistorialPrecioPorIdArticulo(id);

                if (Historial == null || Historial.Count == 0)
                {
                    return NotFound($"No se encontró el artículo con ID {id}");
                }
                return Ok(Historial);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener el Historial del articulo: {ex.Message}");
            }
        }
    }
}
