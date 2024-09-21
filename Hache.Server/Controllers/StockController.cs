using Hache.Server.Entities;
using Hache.Server.Servicios.PedidoSV;
using Hache.Server.Servicios.StockSV;
using Microsoft.AspNetCore.Mvc;

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

    }
}
