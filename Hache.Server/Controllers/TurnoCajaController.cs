using Hache.Server.Servicios.TurnoCajaSV;
using Hache.Server.Entities;
using Microsoft.AspNetCore.Mvc;
using Hache.Server.DTO;
using Microsoft.AspNetCore.Authorization;

namespace Hache.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class TurnoCajaController :ControllerBase
    {
        private readonly ITurnoCajaService _turnoCajaService;

        public TurnoCajaController(ITurnoCajaService turnoCajaService)
        {
            _turnoCajaService = turnoCajaService;
        }

        [HttpPost("abrir")]
        [Authorize]
        public IActionResult AbrirCaja([FromBody] TurnoCaja turnoCaja)
        {
            try
            {
                _turnoCajaService.AbrirTurnoCaja(turnoCaja);
                return Ok("Caja abierta correctamente.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al abrir la caja: {ex.Message}");
            }
        }


        [HttpPost("cerrar")]
        [Authorize]
        public IActionResult CerrarCaja([FromBody] TurnoCajaDTO turnoCajaDTO)
        {
            try
            {
                _turnoCajaService.CerrarTurnoCaja(turnoCajaDTO.idTurnoCaja, turnoCajaDTO.fechaCierre, turnoCajaDTO.montoCierre, turnoCajaDTO.montoRetiro);
                return Ok("Caja cerrada correctamente.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al cerrar la caja: {ex.Message}");
            }
        }

        [HttpGet("abierta/{idTurno}")]
        [Authorize]
        public IActionResult ObtenerTurnoCajaPorId(int idTurno)
        {
            try
            {
                var result = _turnoCajaService.ObtenerTurnoCajaPorId(idTurno);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener la caja por id: {ex.Message}");
            }
        }
    }
}
