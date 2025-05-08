using Hache.Server.Entities;
using Hache.Server.Servicios.PedidoSV;
using Hache.Server.Servicios.StockSV;
using Microsoft.AspNetCore.Mvc;
using Hache.Server.DTO;
using Microsoft.AspNetCore.Authorization;


namespace Hache.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StockController:ControllerBase
    {
        private readonly IStockService _StockService;

        public StockController(IStockService stockService)
        {
            _StockService = stockService;
        }

        [HttpGet]
        [Authorize]
        public ActionResult<List<Stock>> GetStocks()
        {
            try
            {
                List<Stock> stock = _StockService.ObtenerTodosLosStocks();
                return Ok(stock);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener los Stocks: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        [Authorize]
        public ActionResult<List<Stock>> GetStockPorId(int id)
        {
            try
            {
                List<Stock> stock = _StockService.ObtenerStockPorIdArticulo(id);

                if (stock == null || stock.Count == 0)
                {
                    return NotFound($"No se encontró el artículo con ID {id}");
                }
                return Ok(stock);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener el Pedido: {ex.Message}");
            }
        }

        [HttpGet("Local/{idLocal}")]
        [Authorize]
        public ActionResult<List<StocksDTO>> GetStocksLocal(int idLocal)
        {
            try
            {
                List<StocksDTO> stock = _StockService.ObtenerStocksLocal(idLocal);

                if (stock == null || stock.Count == 0)
                {
                    return NotFound($"No se encontró stocks con id de local: {idLocal}");
                }
                return Ok(stock);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener el stock: {ex.Message}");
            }
        }

        [HttpPatch]
        [Authorize]
        public ActionResult EditarStock(int idStock, int cantidad)
        {
            try
            {
                _StockService.EditarStock(idStock, cantidad);
                return Ok(new { mensaje = "La cantidad se ha actualizado correctamente." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar cantidad: {ex.Message}");
            }
        }

        [HttpPatch("descontarStock")]
        [Authorize]
        public ActionResult descontarStock(int idArticulo,int idLocal ,int cantidad)
        {
            try
            {
                _StockService.descontarStock(idArticulo, idLocal, cantidad);
                return Ok(new { mensaje = "La cantidad se ha actualizado correctamente." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar cantidad: {ex.Message}");
            }
        }

        [HttpPatch("agregarOActualizarStock")]
        [Authorize]
        public ActionResult agregarOActualizarStock(int idArticulo, int idLocal, int cantidad)
        {
            try
            {
                _StockService.agregarOActualizarStock(idArticulo, idLocal, cantidad);
                return Ok(new { mensaje = "El stock se ha agregado correctamente." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al agregar stock: {ex.Message}");
            }
        }



    }
}
