using Hache.Server.Entities;
using Microsoft.Data.SqlClient;

namespace Hache.Server.Servicios.ConexionDB
{
    public interface IConexionDB
    {
        SqlConnection ObtenerConexion();
        bool ProbarConexion();



    }
}

