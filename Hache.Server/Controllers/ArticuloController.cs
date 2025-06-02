using Hache.Server.Entities;
using Hache.Server.Servicios;
using Microsoft.AspNetCore.Mvc;
using Hache.Server.DAO;
using System.Data;
using Hache.Server.Servicios.ArticulosSV;
using Hache.Server.DTO;
using Microsoft.AspNetCore.Authorization;

namespace Hache.Server.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ArticuloController : ControllerBase
    {
        private readonly IArticuloService _articuloService;

        // Constructor con inyección de dependencias
        public ArticuloController(IArticuloService articuloService)
        {
            _articuloService = articuloService;
        }

        // GET api/articulos
        [HttpGet]
        public ActionResult<List<Articulo>> GetArticulos()
        {
            try
            {
                // Llama al servicio para obtener la lista de artículos
                List<Articulo> articulos = _articuloService.ObtenerTodosLosArticulos();
                return Ok(articulos);
            }
            catch (Exception ex)
            {
                // Manejo de errores y retorno de mensaje adecuado
                return StatusCode(500, $"Error al obtener los artículos: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        [Authorize]
        public ActionResult<List<Articulo>> GetArticuloPorId(int id)
        {
            try
            { 
                List<Articulo> articulos = _articuloService.ObtenerArticuloPorID(id);

                if (articulos == null || articulos.Count == 0)
                {
                    return NotFound($"No se encontró el artículo con ID {id}");
                }
                return Ok(articulos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener el artículo: {ex.Message}");
            }
        }

        [HttpGet("ObtenerArticulosPorCategoria")]
        [Authorize]
        public ActionResult<List<Articulo>> ObtenerArticulosPorCategoria(int idCategoria)
        {
            try
            {
               
                List<Articulo> articulos = _articuloService.ObtenerArticulosPorCategoria(idCategoria);
                return Ok(articulos);
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, $"Error al obtener los artículos por categoria: {ex.Message}");
            }
        }


        [HttpPost]
        [Authorize]
        public ActionResult AgregarArticulo([FromBody] ArticuloDTO nuevoArticuloDTO)
        {
            try
            {
              
                Articulo nuevoArticulo = new Articulo
                {
                    ID_Articulo = 0, 
                    Nombre = nuevoArticuloDTO.Nombre,
                    CodigoXubio = nuevoArticuloDTO.CodigoXubio,
                    Precio = nuevoArticuloDTO.Precio,
                    Categoria = new Categoria
                    {
                        ID_Categoria = nuevoArticuloDTO.Categoria.Id,
                        Nombre = nuevoArticuloDTO.Categoria.Nombre
                    },
                    Marca = new Marca
                    {
                        ID_Marca = nuevoArticuloDTO.Marca.Id,
                        Nombre = nuevoArticuloDTO.Marca.Nombre
                    }
                };

                _articuloService.CargarArticulo(nuevoArticulo);

                return Ok(new { message = "Artículo agregado correctamente." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al cargar nuevo artículo: {ex.Message}");
            }
        }


        [HttpPatch]
        [Authorize]
        public ActionResult ModificarPrecioArticulo(int idArticulo, decimal nuevoPrecio)
        {
            try
            {
                _articuloService.ModificarPrecioArticulo(idArticulo, nuevoPrecio);
                return Ok("El precio se ha actualizado correctamente. ");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al cargar nuevo articulo: {ex.Message}");
            }

        }

        [HttpPatch("baja-articulo/{idArticulo}")]
        [Authorize]
        public ActionResult BajaArticulo(int idArticulo)
        {
            try
            {
                _articuloService.BajaArticulo(idArticulo);
                return Ok(new { message = "El articulo se ha dado de baja correctamente." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al dar de baja el articulo: {ex.Message}");
            }
        }

        [HttpPut("ActualizarArticulo")]
        [Authorize]
        public ActionResult ActualizarArticulo([FromBody] ArticuloDTO articuloDTO)
        {
            try
            {
                Console.WriteLine($"Datos recibidos para actualizar: {System.Text.Json.JsonSerializer.Serialize(articuloDTO)}");

                Articulo articulo = new Articulo
                {
                    ID_Articulo = articuloDTO.Id,
                    Nombre = articuloDTO.Nombre,
                    CodigoXubio = articuloDTO.CodigoXubio,
                    Precio = articuloDTO.Precio,
                    Categoria = new Categoria
                    {
                        ID_Categoria = articuloDTO.Categoria.Id,
                        Nombre = articuloDTO.Categoria.Nombre
                    },
                    Marca = new Marca
                    {
                        ID_Marca = articuloDTO.Marca.Id,
                        Nombre = articuloDTO.Marca.Nombre
                    }
                };

                _articuloService.ActualizarArticulo(articulo);

                return Ok(new { message = "El articulo se ha actualizado correctamente." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar el articulo: {ex.Message}");
            }
        }


    }
}
