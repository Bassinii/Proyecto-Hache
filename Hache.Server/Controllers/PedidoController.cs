using Hache.Server.Entities;
using Hache.Server.Servicios;
using Microsoft.AspNetCore.Mvc;
using Hache.Server.DAO;
using System.Data;
using Hache.Server.Servicios.PedidoSV;

namespace Hache.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PedidoController : ControllerBase
    {
        private readonly IPedidoService _pedidoService;

        public PedidoController(IPedidoService pedidoService)
        {
            _pedidoService = pedidoService;
        }

        [HttpGet]
        public ActionResult<List<Pedido>> GetPedidos() {
            try
            {
                List<Pedido> pedidos = _pedidoService.ObtenerTodosLosPedidos();
                return Ok(pedidos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener los pedidos: {ex.Message}");
            }
        }

        [HttpGet("id/{id}")]
        public ActionResult<List<Pedido>> GetPedidoPorId(int id)
        {
            try
            {
                List<Pedido> pedidos = _pedidoService.ObtenerPedidoPorId(id);

                if (pedidos == null || pedidos.Count == 0)
                {
                    return NotFound($"No se encontró el artículo con ID {id}");
                }
                return Ok(pedidos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener el Pedido: {ex.Message}");
            }
        }


        [HttpGet("Fecha/{FechaPedido}")]
        public ActionResult<List<Pedido>> GetPedidoPorFecha(DateTime FechaPedido)
        {
            try
            {
                List<Pedido> pedidos = _pedidoService.ObtenerPedidoPorFecha(FechaPedido);

                if (pedidos == null || pedidos.Count == 0)
                {
                    return NotFound($"No se encontró el/los pedidos con la fecha: {FechaPedido}");
                }
                return Ok(pedidos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener el Pedido: {ex.Message}");
            }
        }
    }
}
