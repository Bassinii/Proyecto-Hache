using Hache.Server.Entities;
using Hache.Server.Servicios;
using Microsoft.AspNetCore.Mvc;
using Hache.Server.DAO;
using System.Data;
using Hache.Server.Servicios.Articulos;

namespace Hache.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticuloController : ControllerBase
    {
        private readonly IArticuloService _articuloService;

        // Constructor con inyección de dependencias
        public ArticuloController(IArticuloService articuloService)
        {
            _articuloService = articuloService;
        }

        // GET api/articulos
        [HttpGet]
        public ActionResult<List<Articulo>> GetArticulos()
        {
            try
            {
                // Llama al servicio para obtener la lista de artículos
                List<Articulo> articulos = _articuloService.ObtenerTodosLosArticulos();
                return Ok(articulos);
            }
            catch (Exception ex)
            {
                // Manejo de errores y retorno de mensaje adecuado
                return StatusCode(500, $"Error al obtener los artículos: {ex.Message}");
            }
        }

    }
}
