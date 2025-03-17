using Hache.Server.DTO;
using Hache.Server.Entities;

namespace Hache.Server.Servicios.StockSV
{
    public interface IStockService
    {
        List<Stock> ObtenerTodosLosStocks();

        List<Stock> ObtenerStockPorId(int id);  

        List<Stock> ObtenerStockPorIdArticulo(int idArticulo);

        List<StocksDTO> ObtenerStocksLocal(int idLocal);
    }
}
