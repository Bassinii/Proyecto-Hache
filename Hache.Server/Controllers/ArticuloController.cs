using Hache.Server.Entities;
using Hache.Server.Servicios;
using Microsoft.AspNetCore.Mvc;
using Hache.Server.DAO;
using System.Data;
using Hache.Server.Servicios.ArticulosSV;

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

        [HttpGet("{id}")]
        public ActionResult<List<Articulo>> GetArticuloPorId(int id)
        {
            try
            { 
                List<Articulo> articulos = _articuloService.ObtenerArticuloPorID(id);

                if (articulos == null || articulos.Count == 0)
                {
                    return NotFound($"No se encontró el artículo con ID {id}");
                }
                return Ok(articulos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener el artículo: {ex.Message}");
            }
        }

        [HttpPost]
        public ActionResult AgregarArticulo([FromBody] Articulo nuevoArticulo)
        {
            try
            {
                Articulo articulo = _articuloService.CargarArticulo(nuevoArticulo);
                return Ok(articulo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al cargar nuevo articulo: {ex.Message}");
            }

        }

        [HttpPatch]
        public ActionResult ModificarPrecioArticulo(int idArticulo, decimal nuevoPrecio)
        {
            try
            {
                _articuloService.ModificarPrecioArticulo(idArticulo, nuevoPrecio);
                return Ok("El precio se ha actualizado correctamente. ");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al cargar nuevo articulo: {ex.Message}");
            }

        }

        [HttpPatch("baja-articulo/{idArticulo}")]
        public ActionResult BajaArticulo(int idArticulo)
        {
            try
            {
                _articuloService.BajaArticulo(idArticulo);
                return Ok("El articulo se ha dado de baja correctamente.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al dar de baja el articulo: {ex.Message}");
            }
        }
    }
}
