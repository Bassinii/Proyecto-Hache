using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoHistorialPrecios
    {

        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoHistorialPrecios(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        public DataTable tablaHistorialPrecios()
        {
            string consulta = ("SELECT ID_HistorialPrecios, Id_Articulo, Precio_Anterior, Precio_Nuevo, Fecha_Cambio from HistorialPrecios");
            return _accesoDB.ObtenerTabla("HistorialPrecios", consulta);
        }
        public DataTable ObtenerHistorialPreciosPorId(int idHistorialPrecios)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_HistorialPrecios, Nombre FROM HistorialPrecios  WHERE ID_HistorialPrecios = @ID_HistorialPrecios";

            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_HistorialPrecios", SqlDbType.Int) { Value = idHistorialPrecios }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("HistorialPrecios", consulta, parametros);
        }

        public DataTable ObtenerHistorialPreciosPorIdArticulo(int idArticulo)
        {
            string consulta = "SELECT ID_HistorialPrecios, ID_Articulo, Precio_Anterior, Precio_Nuevo, Fecha_Cambio FROM HistorialPrecios WHERE ID_Articulo = @ID_Articulo";
 
            SqlParameter[] parametros = new SqlParameter[]
            {
            new SqlParameter("@ID_Articulo", SqlDbType.Int) { Value = idArticulo }
            };

            return _accesoDB.ObtenerTabla("HistorialPrecios", consulta, parametros);
        }
    }
}
