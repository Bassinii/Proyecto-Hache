
using Hache.Server.Entities;
using Hache.Server.Servicios.TipoPedidoSV;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hache.Server.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class TipoPedidoController:ControllerBase
    {
        private readonly ITipoPedidoService tipoPedidoService_;

        public TipoPedidoController(ITipoPedidoService tipoPedidoService)
        {
            tipoPedidoService_ = tipoPedidoService;
        }

        [HttpGet]
        [Authorize]
        public ActionResult<List<TipoPedido>> GetTipoPedidos()
        {
            try
            {
                // Llama al servicio para obtener la lista de artículos
                List<TipoPedido> tipos = tipoPedidoService_.ObtenerTiposDePedido();
                return Ok(tipos);
            }
            catch (Exception ex)
            {
                // Manejo de errores y retorno de mensaje adecuado
                return StatusCode(500, $"Error al obtener los tipos de pedido: {ex.Message}");
            }
        }
    }
}
