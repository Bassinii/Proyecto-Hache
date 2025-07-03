using Hache.Server.Entities;
using Hache.Server.Servicios;
using Microsoft.AspNetCore.Mvc;
using Hache.Server.DAO;
using System.Data;
using Hache.Server.Servicios.PedidoSV;
using Hache.Server.DTO;
using Microsoft.AspNetCore.Authorization;

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
        [Authorize]
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
                Pedido pedido = _pedidoService.ObtenerPedidoPorId(id);

                if (pedido == null)
                {
                    return NotFound($"No se encontró el artículo con ID {id}");
                }
                return Ok(pedido);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener el Pedido: {ex.Message}");
            }
        }


        [HttpGet("Fecha/{FechaPedido}")]
        [Authorize]
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

        [HttpGet("observacion/{idPedido}")]
        [Authorize]
        public ActionResult GetObservacion(int idPedido)
        {
            try
            {
                var observacion = _pedidoService.ObtenerObservacion(idPedido);
                return Ok(observacion);
            }
            catch (Exception ex)
            {
                // Manejo de errores y respuesta con código 500
                return StatusCode(500, $"Error al obtener la observacion pedido: {ex.Message}");
            }
        }

        [HttpPatch("editarObservacion")]
        [Authorize]

        public ActionResult editarObservacion([FromBody] observacionUpdateDTO dto)
        {
            try
            {
                _pedidoService.editarObservacion(dto.IdPedido,dto.Observacion);
                return Ok("Observación actualizada correctamente.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al editar la Observacion pedido: {ex.Message}");
            }
        }

        [HttpPost]
        [Authorize]
        public ActionResult AgregarPedido([FromBody] Pedido nuevoPedido)
        {
            try
            {
                // Llamar al servicio que manejará la transacción
                Pedido pedido = _pedidoService.CargarPedido(nuevoPedido); // Cambia a este método en el servicio que maneja la transacción
                return Ok(pedido);
            }
            catch (Exception ex)
            {
                // Manejo de errores y respuesta con código 500
                return StatusCode(500, $"Error al cargar pedido: {ex.Message}");
            }
        }

        [HttpPatch("{idPedido}")]
        [Authorize]
        public ActionResult EditarPedido(int idPedido, [FromBody] PedidoUpdateDTO pedido)
        {
            try
            {

                _pedidoService.editarPedidoPorId(idPedido, pedido.Estado, pedido.Fecha_Entrega);
                return Ok();
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, $"Error al editar el pedido: {ex.Message}");
            }
        }


    }
}
