using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoArticulos
    {
        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoArticulos(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        // Método que retorna la tabla de artículos
        public DataTable tablaArticulos()
        {
            string consulta = "SELECT ID_Articulo, Nombre, Precio_Unitario, ID_Categoria, ID_Marca FROM Articulos";
            return _accesoDB.ObtenerTabla("Articulos", consulta);
        }
    }


}
