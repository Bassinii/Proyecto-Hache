using Hache.Server.Entities;
using Hache.Server.Servicios;
using Microsoft.AspNetCore.Mvc;
using Hache.Server.DAO;
using System.Data;
using Hache.Server.Servicios.MarcaSV;

namespace Hache.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MarcaController : ControllerBase
    {
        private readonly IMarcaService _marcaService;

        public MarcaController(IMarcaService marcaService)
        {
            _marcaService = marcaService;
        }

        [HttpGet]
        public ActionResult<List<Marca>> GetMarca()
        {
            try
            {
                List<Marca> marca = _marcaService.ObtenerTodasLasMarcas();
                return Ok(marca);

            }
            catch (Exception ex)
            {
                // Manejo de errores y retorno de mensaje adecuado
                return StatusCode(500, $"Error al obtener las Imagenes: {ex.Message}");
            }
        }


        [HttpPost]
        public ActionResult AgregarMarca([FromBody] Marca nuevaMarca)
        {
            try
            {
                Marca marca = _marcaService.AgregarMarca(nuevaMarca);
                return Ok(marca);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al cargar nueva Marca: {ex.Message}");
            }

        }

        [HttpPatch]

        public ActionResult BajaMarca(int idMarca)
        {
            try
            {
                _marcaService.BajaMarca(idMarca);
                return Ok(new { message = "Categoria dado de baja correctamente." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al dar de baja la Marca: {ex.Message}");
            }
        }

    }
}
