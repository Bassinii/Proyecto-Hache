using Microsoft.Data.SqlClient;
using System;
using System.Data;


namespace Hache.Server.DAO
{
    public class DaoImagenes
    {
        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoImagenes(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        public DataTable tablaImagenes()
        {
            string consulta = ("SELECT ID_Imagen, ID_Articulo,URL_Imagen from Imagenes");
            return _accesoDB.ObtenerTabla("Imagenes", consulta);
        }
    }
}
