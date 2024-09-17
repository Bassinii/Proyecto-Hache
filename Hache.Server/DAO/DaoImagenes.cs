using Hache.Server.Entities;
using Microsoft.Data.SqlClient;
using System;
using System.Data;


namespace Hache.Server.DAO
{
    public class DaoImagenes
    {
        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoImagenes(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        public DataTable tablaImagenes()
        {
            string consulta = ("SELECT ID_Imagen, ID_Articulo,URL_Imagen from Imagenes");
            return _accesoDB.ObtenerTabla("Imagenes", consulta);
        }

        public DataTable ObtenerImagenPorId(int idImagen)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_Imagen, url FROM Imagenes  WHERE ID_Imagen = @ID_Imagen";

            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Imagen", SqlDbType.Int) { Value = idImagen }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("Imagenes", consulta, parametros);
        }

        public DataTable ObtenerImagenPorIdArticulo(int idArticulo)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_Imagen, url FROM Imagenes  WHERE ID_Articulo = @ID_Articulo";

            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Articulo", SqlDbType.Int) { Value = idArticulo }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("Imagenes", consulta, parametros);
        }
    }
}
