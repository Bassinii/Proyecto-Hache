using Hache.Server.Entities;
using Hache.Server.Servicios.CategoriasSV;
using Hache.Server.Servicios.DetallePedidoSV;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hache.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DetallePedidoController: ControllerBase
    {
        private readonly IDetallePedidoService detallePedidoService;

        public DetallePedidoController(IDetallePedidoService detallePedidoService)
        {
            this.detallePedidoService = detallePedidoService;
        }

        [HttpPut("{idPedido}")]
        [Authorize]
        public IActionResult EditarDetalles(int idPedido, [FromBody] List<DetallePedido> detalles)
        {
            try
            {
                detallePedidoService.EditarDetallePedido(idPedido, detalles);
                return Ok(new { mensaje = "Detalles del pedido actualizados correctamente." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }


    }
}
