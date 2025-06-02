using Hache.Server.Entities;
using Hache.Server.Servicios;
using Microsoft.AspNetCore.Mvc;
using Hache.Server.DAO;
using System.Data;
using Hache.Server.Servicios.ImagenesSV;
using Microsoft.AspNetCore.Authorization;
using Hache.Server.DTO;

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
        [Authorize]
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

        [HttpGet("{id}")]
        [Authorize]
        public ActionResult GetImagenPorIdArticulo(int id) {
            try
            {
                List<Imagen> imagen = _imagenService.ObtenerImagenPorIdArticulo(id);
                return Ok(imagen);
            }
            catch (Exception ex)
            {
                // Manejo de errores y retorno de mensaje adecuado
                return StatusCode(500, $"Error al obtener las Imagenes: {ex.Message}");
            }

        }



        [HttpPost("subir")]
        public async Task<IActionResult> SubirImagen([FromForm] SubidaImagenDTO dto)
        {
            var archivo = dto.Archivo;
            var idArticulo = dto.IdArticulo;

            if (archivo == null || archivo.Length == 0)
            {
                return BadRequest("No se recibió archivo.");
            }

            var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            if (!Directory.Exists(uploadsPath))
                Directory.CreateDirectory(uploadsPath);

            var nombreArchivo = Guid.NewGuid().ToString() + Path.GetExtension(archivo.FileName);
            var rutaCompleta = Path.Combine(uploadsPath, nombreArchivo);

            using (var stream = new FileStream(rutaCompleta, FileMode.Create))
            {
                await archivo.CopyToAsync(stream);
            }

            string urlImagen = "/uploads/" + nombreArchivo;

            var imagen = new Imagen
            {
                ID_Articulo = idArticulo,
                url = urlImagen
            };

            var dao = new DaoImagenes(new AccesoDB());
            dao.AgregarImagenes(new List<Imagen> { imagen });

            return Ok(new { mensaje = "Imagen subida correctamente", url = urlImagen });
        }



    }

}
