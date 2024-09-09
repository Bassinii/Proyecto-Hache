using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Hache.Server.DAO;

namespace Hache.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestConexionController : ControllerBase
    {
        private readonly AccesoDB _accesoDB;

        public TestConexionController()
        {
            _accesoDB = new AccesoDB();
        }

        [HttpGet("probar-conexion")]
        public IActionResult ProbarConexion()
        {
            try
            {
                using (SqlConnection cn = _accesoDB.ObtenerConexion())
                {
                    if (cn != null && cn.State == System.Data.ConnectionState.Open)
                    {
                        return Ok("Conexión exitosa a la base de datos.");
                    }
                    else
                    {
                        return StatusCode(500, "Error al conectar con la base de datos.");
                    }
                }
            }
            catch (Exception ex)
            {
                // Log del error
                return StatusCode(500, $"Error al conectar con la base de datos: {ex.Message}");
            }
        }
    }
}