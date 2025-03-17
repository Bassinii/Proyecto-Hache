using Hache.Server.Entities;
using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoStocks
    {

        AccesoDB Acceso = new AccesoDB();

        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoStocks(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        public DataTable tablaStocks()
        {
            string consulta = ("SELECT ID_Stock, ID_Local, ID_Articulo, Cantidad from Stocks");
            return _accesoDB.ObtenerTabla("Stocks", consulta);
        }
        public DataTable ObtenerStocksPorId(int idStocks)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_Stock, ID_Local, ID_Articulo, Cantidad FROM Stocks WHERE ID_Stocks = @ID_Stocks";

            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Stocks", SqlDbType.Int) { Value = idStocks }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("Stocks", consulta, parametros);
        }

        public DataTable ObtenerStockPorIdArticulo(int idArticulo)
        {
                string consulta = "SELECT ID_Stock, ID_Local, ID_Articulo, Cantidad FROM Stocks WHERE ID_Articulo = @ID_Articulo";

                SqlParameter[] parametros = new SqlParameter[]
                {
                new SqlParameter("@ID_Articulo", SqlDbType.Int) { Value = idArticulo }
                };

                return _accesoDB.ObtenerTabla("Stocks", consulta, parametros);    
        }

        public void AgregarStock(Stock stock)
        {
            SqlParameter[] parametros = new SqlParameter[]
            {
            new SqlParameter("@ID_Local", SqlDbType.Int) { Value = stock.ID_Local  },
            new SqlParameter("@ID_Articulo", SqlDbType.Int, 50) { Value = stock.ID_Articulo },
            new SqlParameter("@Cantidad", SqlDbType.Int, 50) { Value = stock.cantidad },
            
            };

            _accesoDB.EjecutarComando("INSERT INTO Stocks (ID_Local, ID_Articulo, Cantidad) "
                + "VALUES(@ID_Local, @ID_Articulo, @Cantidad )", parametros);
        }

        public DataTable ObtenerStocksLocal(int idLocal)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_Stock, ID_Local, ID_Articulo, Cantidad FROM Stocks WHERE ID_Local = @ID_Local";

            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Local", SqlDbType.Int) { Value = idLocal }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("Stocks", consulta, parametros);
        }




    }

}
