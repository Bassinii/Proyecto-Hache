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


        [HttpPost]
        public ActionResult AgregarCategoria([FromBody] Categoria nuevaCategoria) 
        {
            try
            {
                Categoria categoria = _CategoriaService.AgregarCategoria(nuevaCategoria);
                return Ok(categoria);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al cargar nueva categoria: {ex.Message}");
            }

        }

        [HttpPatch("baja-categoria/{idCategoria}")]
        public ActionResult BajaCategoria(int idCategoria)
        {
            try
            {
                _CategoriaService.BajaCategoria(idCategoria);
                return Ok(new { message = "Categoria dado de baja correctamente." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al dar de baja la categoria: {ex.Message}");
            }
        }

        [HttpGet("ObtenerCategoriaPorTipoPedido")]
        public ActionResult<List<Categoria>> ObtenerCategoriaPorTipoPedido(int idTipoPedido)
        {
            try
            {
                // Llama al servicio para obtener la lista de artículos
                List<Categoria> categorias = _CategoriaService.ObtenerCategoriaPorTipoPedido(idTipoPedido);
                return Ok(categorias);
            }
            catch (Exception ex)
            {
                // Manejo de errores y retorno de mensaje adecuado
                return StatusCode(500, $"Error al obtener las Categorias por tipo de pedido: {ex.Message}");
            }
        }


    }
}

