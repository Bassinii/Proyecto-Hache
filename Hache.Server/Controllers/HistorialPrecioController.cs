using Hache.Server.Entities;
using Hache.Server.Servicios.HistorialPreciosSV;
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
                return StatusCode(500, $"Error al obtener las Categorias: {ex.Message}");
            }


        }
    }
}
