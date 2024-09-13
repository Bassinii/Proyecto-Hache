using Microsoft.Data.SqlClient;
using Hache.Server.DAO;
using Hache.Server.Servicios;

namespace Hache.Server.Services
{
    public class ConexionDB : IConexionDB
    {
        private readonly AccesoDB _accesoDB;

        public ConexionDB()
        {
            _accesoDB = new AccesoDB();
        }

        public SqlConnection ObtenerConexion()
        {
            return _accesoDB.ObtenerConexion();
        }

        public bool ProbarConexion()
        {
            using (SqlConnection cn = ObtenerConexion())
            {
                return cn != null && cn.State == System.Data.ConnectionState.Open;
            }
        }
    }
}