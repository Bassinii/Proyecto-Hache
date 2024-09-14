using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Hache.Server.DAO;
using Hache.Server.Servicios;

namespace Hache.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestConexionController : ControllerBase
    {
        private readonly IConexionDB _conexionDB;

        public TestConexionController(IConexionDB conexionDB)
        {
            _conexionDB = conexionDB;
        }

        [HttpGet("probar-conexion")]
        public ActionResult ProbarConexion()
        {
            try
            {
                if (_conexionDB.ProbarConexion())
                {
                    return Ok("CONEXION EXITOSA A LA BASE DE DATOS");
                }
                else
                {
                    return StatusCode(500, "ERROR AL CONECTAR A LA BASE DE DATOS");
                }
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Error al conectar con la base de datos: {ex.Message}");
            }



        }
    }
}