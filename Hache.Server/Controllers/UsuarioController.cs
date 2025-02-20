using Hache.Server.Entities;
using Hache.Server.Servicios.UsuarioSV;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Hache.Server.DTO;
using Hache.Server.JwtSecurity;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Authorization;

namespace Hache.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController:ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        private readonly JwtService _jwtService;

        public UsuarioController(IUsuarioService usuarioService,JwtService jwtService)
        {
            _usuarioService = usuarioService;
            _jwtService = jwtService;
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
        public ActionResult<AuthSessionDTO> Login([FromBody] LoginDTO loginRequest)

        {

            var usuario = _usuarioService.ValidarUsuario(loginRequest.NombreUsuario, loginRequest.Contrasenia);

            if (usuario == null)
            {
                return Unauthorized("Usuario o contraseña incorrectos");
            }

            string Token = _jwtService.GenerateToken(usuario.NombreUsuario);

            if (string.IsNullOrEmpty(Token))
            {
                return Unauthorized("Token no generado correctamente");
            }

            var authSession = new AuthSessionDTO
            {
                Token = Token,
                ID_Usuario = usuario.ID_Usuario,
                NombreUsuario = usuario.NombreUsuario,
                CorreoElectronico = usuario.CorreoElectronico,
                NombreCompleto = usuario.NombreCompleto,
                ID_Local = usuario.ID_Local,
                TipoUsuario = usuario.TipoUsuario
            };

            return Ok(authSession);


        }


    }
}
