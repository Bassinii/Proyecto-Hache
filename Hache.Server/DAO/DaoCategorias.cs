using Hache.Server.DAO;
using Hache.Server.Entities;
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
            string consulta = ("SELECT ID_Categoria, ID_TipoPedido, Nombre from Categorias WHERE ActivoCategoria=1");
             return _accesoDB.ObtenerTabla("Categorias", consulta);
        }

        public DataTable ObtenerCategoriaPorId(int idCategoria)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_Categoria, ID_TipoPedido, Nombre FROM Categorias WHERE ID_Categoria = @ID_Categoria AND ActivoCategoria=1";

            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Categoria", SqlDbType.Int) { Value = idCategoria }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("Categorias", consulta, parametros);
        }

        public void AgregarCategoria(Categoria NuevaCategoria)
        {
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_TipoPedido", SqlDbType.NVarChar, 50) { Value = NuevaCategoria.ID_TipoPedido },
                new SqlParameter("@Nombre", SqlDbType.NVarChar, 50) { Value = NuevaCategoria.Nombre }
            };

            _accesoDB.EjecutarComando("INSERT INTO Categorias (ID_TipoPedido, Nombre) "
                + "VALUES(@ID_TipoPedido, @Nombre)", parametros);
        }

        public void BajaCategoria(int idCategoria)
        {
            string consulta = "UPDATE Categorias SET ActivoCategoria = 0 WHERE ID_Categoria = @ID_Categoria";

            SqlParameter[] parametros = new SqlParameter[]
           {
                new SqlParameter("@ID_Categoria", SqlDbType.Int) { Value = idCategoria }
           };
            _accesoDB.EjecutarComando(consulta, parametros);
        }

        public DataTable ObtenerCategoriaPorTipoPedido(int idTipoPedido)
        {
            string consulta = "SELECT ID_Categoria, ID_TipoPedido, Nombre FROM Categorias WHERE ID_TipoPedido = @ID_TipoPedido";

            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_TipoPedido", SqlDbType.Int) { Value = idTipoPedido }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("Categorias", consulta, parametros);
        }
    }
}


