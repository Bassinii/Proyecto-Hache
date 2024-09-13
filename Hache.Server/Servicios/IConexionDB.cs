using Microsoft.Data.SqlClient;

namespace Hache.Server.Servicios
{
    public interface IConexionDB
    {
        SqlConnection ObtenerConexion();
        bool ProbarConexion();

    }
}

