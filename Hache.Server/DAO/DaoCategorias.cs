using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoCategorias
    {
        AccesoDB acceso = new AccesoDB();

        public DataTable tablaCategoria()
        {
            DataTable Table = acceso.ObtenerTabla("Categorias", " SELECT ID_Categoria, Nombre from Categorias");
            return Table;
        }
    }
}
