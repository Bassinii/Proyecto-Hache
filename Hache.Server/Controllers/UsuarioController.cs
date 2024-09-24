using Hache.Server.Entities;
using Hache.Server.Servicios.UsuarioSV;
using Microsoft.AspNetCore.Mvc;

namespace Hache.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController:ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost]
        public ActionResult AgregarUsuario([FromBody] Usuario nuevousuario)
        {
            try
            {
                Usuario usuario = _usuarioService.CargarUsuario(nuevousuario);
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al crear usuario: {ex.Message}");
            }

        }
    }
}
