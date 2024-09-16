using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoHistorialPrecios
    {

        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoHistorialPrecios(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        public DataTable tablaHistorialPrecios()
        {
            string consulta = ("SELECT ID_HistorialPrecios, Id_Articulo, Precio_Anterior, Precio_Nuevo, Fecha_Cambio from HistorialPrecios");
            return _accesoDB.ObtenerTabla("HistorialPrecios", consulta);
        }
    }
}
