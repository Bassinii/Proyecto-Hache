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

        public void EditarStock(int idStock, int cantidad)
        {
            string consulta = "UPDATE Stocks SET Cantidad=@cantidad WHERE ID_Stock = @ID_Stock";

            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Stock", SqlDbType.Int) { Value = idStock },
                new SqlParameter("@cantidad", SqlDbType.Int) { Value = cantidad }
            };

            // Ejecutar la consulta con el parámetro
             _accesoDB.ObtenerTabla("Stocks", consulta, parametros);
        }

        public void AgregarOActualizarStock(int idArticulo, int idLocal, int cantidad)
        {
            SqlCommand comando = new SqlCommand();
            comando.Parameters.AddWithValue("@ID_Articulo", idArticulo);
            comando.Parameters.AddWithValue("@ID_Local", idLocal);
            comando.Parameters.AddWithValue("@Cantidad", cantidad);

            _accesoDB.EjecutarProcedimientoAlmacenado(comando, "AgregarOActualizarStock");

        }

        public void descontarStock(int idArticulo, int idLocal, int cantidad)
        {
            DataTable stocksDelLocal = ObtenerStocksLocal(idLocal);

            foreach (DataRow fila in stocksDelLocal.Rows)
            {
                int articuloId = Convert.ToInt32(fila["ID_Articulo"]);
                if (articuloId == idArticulo)
                {
                    int stockId = Convert.ToInt32(fila["ID_Stock"]);
                    int cantidadActual = Convert.ToInt32(fila["Cantidad"]);
                    int nuevaCantidad = cantidadActual - cantidad;

                    if (nuevaCantidad < 0)
                    {
                        throw new Exception("No hay suficiente stock para realizar esta operación.");
                    }

                    EditarStock(stockId, nuevaCantidad);
                    return;
                }
            }

            throw new Exception("No se encontró stock para el artículo.");
        }

        public void DescontarStockTransaccional(int idArticulo, int idLocal, int cantidad, SqlConnection connection, SqlTransaction transaction)
        {
            string selectQuery = "SELECT ID_Stock, Cantidad FROM Stocks WHERE ID_Articulo = @ID_Articulo AND ID_Local = @ID_Local";

            SqlCommand selectCmd = new SqlCommand(selectQuery, connection, transaction);
            selectCmd.Parameters.AddWithValue("@ID_Articulo", idArticulo);
            selectCmd.Parameters.AddWithValue("@ID_Local", idLocal);

            using (SqlDataReader reader = selectCmd.ExecuteReader())
            {
                if (reader.Read())
                {
                    int idStock = reader.GetInt32(0);
                    int cantidadActual = reader.GetInt32(1);
                    int nuevaCantidad = cantidadActual - cantidad;

                    if (nuevaCantidad < 0)
                    {
                        throw new Exception("No hay suficiente stock para realizar esta operación.");
                    }

                    reader.Close(); // importante cerrar antes de ejecutar otra consulta con la misma conexión

                    string updateQuery = "UPDATE Stocks SET Cantidad = @Cantidad WHERE ID_Stock = @ID_Stock";
                    SqlCommand updateCmd = new SqlCommand(updateQuery, connection, transaction);
                    updateCmd.Parameters.AddWithValue("@Cantidad", nuevaCantidad);
                    updateCmd.Parameters.AddWithValue("@ID_Stock", idStock);
                    updateCmd.ExecuteNonQuery();
                }
                else
                {
                    throw new Exception("No se encontró stock para el artículo en el local indicado.");
                }
            }
        }


    }

}
