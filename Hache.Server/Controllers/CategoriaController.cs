﻿using Hache.Server.Entities;
using Hache.Server.Servicios;
using Microsoft.AspNetCore.Mvc;
using Hache.Server.DAO;
using System.Data;
using Hache.Server.Servicios.CategoriasSV;

namespace Hache.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriaController : ControllerBase
    {
        private readonly ICategoriaService _CategoriaService;

        public CategoriaController(ICategoriaService categoriaService)
        {
            _CategoriaService = categoriaService;
        }

        [HttpGet]
        public ActionResult<List<Categoria>> GetCategorias()
        {
            try
            {
                // Llama al servicio para obtener la lista de artículos
                List<Categoria> categorias = _CategoriaService.ObtenerTodasLasCategorias();
                return Ok(categorias);
            }
            catch (Exception ex)
            {
                // Manejo de errores y retorno de mensaje adecuado
                return StatusCode(500, $"Error al obtener las Categorias: {ex.Message}");
            }

        }
    }
}
