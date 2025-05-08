
using Hache.Server.Entities;
using Hache.Server.Servicios.LocalSV;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hache.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocalController : ControllerBase
    {
        private readonly ILocalService _LocalService;

        public LocalController(ILocalService localService)
        {
            _LocalService = localService;
        }

        [HttpGet]
        [Authorize]
        public ActionResult<List<Local>> GetLocales()
        {
            try
            {
                List<Local> local = _LocalService.ObtenerTodosLosLocales();
                return Ok(local);
            }
            catch (Exception ex)
            {
                // Manejo de errores y retorno de mensaje adecuado
                return StatusCode(500, $"Error al obtener los locales: {ex.Message}");
            }

        }

        [HttpPatch("BajaLocal")]
        [Authorize]
        public ActionResult BajaLocal(int idLocal)
        {
            try
            {
                _LocalService.BajaLocal(idLocal);
                return Ok(new { message = "Local dado de baja correctamente." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al dar de baja el local: {ex.Message}");
            }
        }

        [HttpPost]
        [Authorize]
        public ActionResult AgregarLocal([FromBody] Local nuevoLocal)
        {
            try
            {
                Local local = _LocalService.AgregarLocal(nuevoLocal);
                return Ok(local);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al cargar nuevo local: {ex.Message}");
            }

        }

        [HttpGet("{idLocal}")]
        [Authorize]
        public ActionResult ObtenerLocalPorId(int idLocal)
        {
            try
            {
                Local local = _LocalService.ObtenerLocalPorId(idLocal);

                if (local == null)
                    return NotFound(new { mensaje = "Local no encontrado o inactivo" });

                return Ok(local);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener local por id: {ex.Message}");             
            }

        }
    }

}
