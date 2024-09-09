using Microsoft.Data.SqlClient;
using System;
using System.Data;


namespace Hache.Server.DAO
{
    public class Imagenes
    {
        
            AccesoDB Acceso = new AccesoDB();

            public DataTable TablaImagenes()
            {
                DataTable Table = Acceso.ObtenerTabla("Imagenes", "SELECT ID_Imagen, ID_Articulo,URL_Imagen from Imagenes");

                return Table;
            }
        
    }
}
