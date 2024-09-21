using Hache.Server.DAO;
using Hache.Server.Entities;
using System.Data;

namespace Hache.Server.Servicios.StockSV
{
    public class StockService:IStockService
    {
        private readonly DaoStocks _DaoStocks;

        public StockService (AccesoDB accesoDB)
        {
            _DaoStocks = new DaoStocks(accesoDB);
        }

        public List<Stock> ObtenerTodosLosStocks()
        {
            DataTable tabla = _DaoStocks.tablaStocks();
            List<Stock> Stock = new List<Stock>();

            foreach (DataRow row in tabla.Rows)
            {
                Stock stockNuevo = new Stock
                {
                    
                    ID_Stock = (int)row["ID_Stock"],
                    ID_Local = (int)row["ID_Local"],
                    ID_Articulo = (int)row["ID_Articulo"],
                    cantidad = (int)row["cantidad"],

                };
                Stock.Add(stockNuevo);


            }
            return Stock;
        }

        public List<Stock> ObtenerStockPorId(int id) {
            DataTable tabla = _DaoStocks.ObtenerStocksPorId(id);
            List<Stock> Stock = new List<Stock>();

            if (tabla.Rows.Count > 0)
            {
                foreach (DataRow row in tabla.Rows)
                {
                    Stock stockNuevo = new Stock
                    {
                        ID_Stock = (int)row["ID_Stock"],
                        ID_Local = (int)row["ID_Local"],
                        ID_Articulo = (int)row["ID_Articulo"],
                        cantidad = (int)row["cantidad"],
                    };

                   Stock.Add(stockNuevo) ;
                }
            }
            return Stock;
        }

        public List<Stock> ObtenerStockPorIdArticulo(int idArticulo)
        {
            DataTable tabla = _DaoStocks.ObtenerStockPorIdArticulo(idArticulo);
            List<Stock> stocks = new List<Stock>();

            if (tabla.Rows.Count > 0)
            {
                foreach (DataRow row in tabla.Rows)
                {
                    Stock stockNuevo = new Stock
                    {
                        ID_Stock = (int)row["ID_Stock"],
                        ID_Local = (int)row["ID_Local"],
                        ID_Articulo = (int)row["ID_Articulo"],
                        cantidad = (int)row["cantidad"],
                        
                    };

                    stocks.Add(stockNuevo);
                }
            }

            return stocks;
        }
    }
}
