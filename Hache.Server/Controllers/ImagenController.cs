using Hache.Server.Entities;
using Hache.Server.Servicios;
using Microsoft.AspNetCore.Mvc;
using Hache.Server.DAO;
using System.Data;
using Hache.Server.Servicios.ImagenesSV;

namespace Hache.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImagenController : ControllerBase
    {
        private readonly IImagenService _imagenService;

        public ImagenController(IImagenService imagenService)
        {
            _imagenService = imagenService;
        }

        [HttpGet]
        public ActionResult<List<Imagen>> GetImagen()
        {
            try
            {
                List<Imagen> imagen = _imagenService.ObtenerTodasLasImagenes();
                return Ok(imagen);
            }
            catch (Exception ex)
            {
                // Manejo de errores y retorno de mensaje adecuado
                return StatusCode(500, $"Error al obtener las Imagenes: {ex.Message}");
            }
        }
    }
}
