using Hache.Server.Entities;
using Hache.Server.Servicios.UsuarioSV;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Hache.Server.DTO;

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
        [HttpPost("login")]
        public ActionResult<Usuario> Login([FromBody] LoginDTO loginRequest)
        {

            var usuario = _usuarioService.ValidarUsuario(loginRequest.NombreUsuario, loginRequest.Contrasenia);

            if (usuario == null)
            {
                return Unauthorized("Usuario o contraseña incorrectos");
            }

            return Ok(usuario);


        }


    }
}
