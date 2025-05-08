using Hache.Server.Entities;
using Hache.Server.Servicios.CategoriasSV;
using Hache.Server.Servicios.DetalleVentaSV;
using Microsoft.AspNetCore.Mvc;
using Hache.Server.Servicios;
using Hache.Server.DTO;
using Microsoft.AspNetCore.Authorization;

namespace Hache.Server.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class DetalleVentaController: ControllerBase
    {
        private readonly IDetalleVentaService _DetalleVentaservice;

        public DetalleVentaController(IDetalleVentaService detalleVentaservice)
        {
            _DetalleVentaservice = detalleVentaservice;
        }

        [HttpGet("{idVenta}")]
        [Authorize]
        public ActionResult<List<DetalleVentaDTO>> GetDetalleVentaPorIdVenta(int idVenta)
        {
            try
            {
                List<DetalleVentaDTO> detalleVenta = _DetalleVentaservice.ObtenerDetalleVentaPorIdVenta(idVenta);

                if (detalleVenta == null || detalleVenta.Count == 0)
                {
                    return NotFound($"No se encontró el detalle correspondiente al ID de venta: {idVenta}");
                }
                return Ok(detalleVenta);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener el detalle de venta: {ex.Message}");
            }
        }
    }
}
