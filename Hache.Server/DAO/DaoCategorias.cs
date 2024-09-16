using Hache.Server.DAO;
using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoCategorias
    {
        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoCategorias(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        public DataTable tablaCategoria()
        {
            string consulta = ("SELECT ID_Categoria, Nombre from Categorias");
             return _accesoDB.ObtenerTabla("Categorias", consulta);
        }
    }
}


