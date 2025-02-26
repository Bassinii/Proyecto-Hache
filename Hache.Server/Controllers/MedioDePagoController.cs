using Hache.Server.Entities;
using Hache.Server.Servicios.MedioDePagoSV;
using Microsoft.AspNetCore.Mvc;

namespace Hache.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedioDePagoController : ControllerBase
    {
        private readonly IMedioDePagoService _medioDePagoService;

        public MedioDePagoController(IMedioDePagoService medioDePagoService)
        {
            _medioDePagoService = medioDePagoService;
        }

        [HttpGet]
        public ActionResult<List<MedioDePago>> GetMediosDePago()
        {
            try
            {
                // Llama al servicio para obtener la lista de artículos
                List<MedioDePago> mediosDePago = _medioDePagoService.ObtenerTodosLosMediosDePago();
                return Ok(mediosDePago);
            }
            catch (Exception ex)
            {
                // Manejo de errores y retorno de mensaje adecuado
                return StatusCode(500, $"Error al obtener los medios de pago: {ex.Message}");
            }

        }


        [HttpPost]
        public ActionResult AgregarMedioDePago([FromBody] MedioDePago nuevoMedioDePago)
        {
            try
            {
                MedioDePago medioDePago = _medioDePagoService.AgregarMedioDePago(nuevoMedioDePago);
                return Ok(medioDePago);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al cargar nuevo medio de pago: {ex.Message}");
            }

        }

        [HttpPatch("baja-medioDePago/{idMedioDePago}")]
        public ActionResult BajaMedioDePago(int idMedioDePago)
        {
            try
            {
                _medioDePagoService.BajaMedioDePago(idMedioDePago);
                return Ok("El medio de pago se ha dado de baja correctamente.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al dar de baja el medio de pago: {ex.Message}");
            }
        }
    }
}
