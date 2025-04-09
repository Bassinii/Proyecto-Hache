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

        public void EditarStock(int idStock, int cantidad);

        public void descontarStock(int idArticulo, int idLocal, int cantidad);

        public void agregarOActualizarStock(int idArticulo, int idLocal, int cantidad);
    }
}
