using Hache.Server.Entities;
using Microsoft.Data.SqlClient;
using System;
using System.Data;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Hache.Server.DAO
{
    public class DaoArticulos
    {
        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoArticulos(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        // Método que retorna la tabla de artículos
        public DataTable tablaArticulos()
        {
            string consulta = "SELECT ID_Articulo, Nombre, Precio_Unitario, ID_Categoria, ID_Marca  FROM Articulos WHERE ActivoArticulo=1";
            return _accesoDB.ObtenerTabla("Articulos", consulta);
        }

        public DataTable ObtenerArticulosPorId(int idArticulo)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_Articulo, Nombre, Precio_Unitario, ID_Categoria, ID_Marca  FROM Articulos  WHERE ID_Articulo = @ID_Articulo AND ActivoArticulo=1";

            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Articulo", SqlDbType.Int) { Value = idArticulo }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("Articulos", consulta, parametros);
        }

        public string ObtenerNombreArticuloPorId(int idArticulo)
        {
            string consulta = "SELECT Nombre FROM Articulos WHERE ID_Articulo = @ID_Articulo";

            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Articulo", SqlDbType.Int) { Value = idArticulo }
            };

            DataTable tabla = _accesoDB.ObtenerTabla("Articulos", consulta, parametros);

            if (tabla.Rows.Count > 0)
            {
                return tabla.Rows[0]["Nombre"].ToString(); // Retorna el nombre del artículo
            }

            return null;

        }

        public Articulo ObtenerArticuloObjetoPorId(int idArticulo)
        {
            string consulta = @"
                 SELECT A.ID_Articulo, A.Nombre, A.Precio_Unitario, 
                 M.ID_Marca, M.Nombre AS MarcaNombre, 
                 C.ID_Categoria, C.Nombre AS CategoriaNombre
                 FROM Articulos A
                 INNER JOIN Marcas M ON A.ID_Marca = M.ID_Marca
                 INNER JOIN Categorias C ON A.ID_Categoria = C.ID_Categoria
                 WHERE A.ID_Articulo = @ID_Articulo AND ActivoArticulo=1";

            SqlParameter[] parametros = new SqlParameter[]
            {
             new SqlParameter("@ID_Articulo", SqlDbType.Int) { Value = idArticulo }
            };

            DataTable dataTable = _accesoDB.ObtenerTabla("Articulos", consulta, parametros);

            if (dataTable.Rows.Count > 0)
            {
                DataRow row = dataTable.Rows[0];
                return new Articulo
                {
                    ID_Articulo = (int)row["ID_Articulo"],
                    Nombre = row["Nombre"].ToString(),
                    
                    Precio = Convert.ToDecimal(row["Precio_Unitario"]),

                    // Marca
                    Marca = new Marca
                    {
                        ID_Marca = (int)row["ID_Marca"],
                        Nombre = row["MarcaNombre"].ToString()
                    },

                    // Categoria
                    Categoria = new Categoria
                    {
                        ID_Categoria = (int)row["ID_Categoria"],
                        Nombre = row["CategoriaNombre"].ToString()
                    }
                };
            }

            return null; // O manejar si el artículo no se encuentra
        }

        public void AgregarArticulo(Articulo articulo)
        {
            SqlParameter[] parametros = new SqlParameter[]
            {
            new SqlParameter("@Nombre", SqlDbType.NVarChar, 50) { Value = articulo.Nombre },
            new SqlParameter("@Precio_Unitario", SqlDbType.Decimal, 50) { Value = articulo.Precio },
            new SqlParameter("@ID_Categoria", SqlDbType.Int, 50) { Value = articulo.Categoria.ID_Categoria},
            new SqlParameter("@ID_Marca", SqlDbType.Int, 100) { Value = articulo.Marca.ID_Marca}, 
            };

            _accesoDB.EjecutarComando("INSERT INTO Articulos(Nombre, Precio_Unitario, ID_Categoria, ID_Marca ) "
                + "VALUES(@Nombre, @Precio_Unitario, @ID_Categoria, @ID_Marca  )", parametros);
        }

        public void ModificarPrecioArticulo(int idArticulo, decimal nuevoPrecio)
        {
            
            string consulta = "UPDATE Articulos SET Precio_Unitario = @NuevoPrecio WHERE ID_Articulo = @ID_Articulo";

            SqlParameter[] parametros = new SqlParameter[]
            {
                 new SqlParameter("@NuevoPrecio", SqlDbType.Decimal) { Value = nuevoPrecio },
                 new SqlParameter("@ID_Articulo", SqlDbType.Int) { Value = idArticulo }
            };
            _accesoDB.EjecutarComando(consulta, parametros);
        }

        public void BajaArticulo(int idArticulo)
        {
            string consulta = "UPDATE Articulos  SET ActivoArticulo = 0 WHERE ID_Articulo = @ID_Articulo";
            SqlParameter[] parametros = new SqlParameter[]
           {   
                 new SqlParameter("@ID_Articulo", SqlDbType.Int) { Value = idArticulo }
           };
            _accesoDB.EjecutarComando(consulta, parametros);

        }

        public void ActualizarArticulo(int idArticulo, string nombre, decimal precio, int idCategoria, int idMarca)
        {
            string consulta = "UPDATE Articulos SET Nombre = @nombre, Precio_Unitario = @Precio , ID_Categoria = @Categoria , ID_Marca = @Marca WHERE ID_Articulo = @ID_Articulo AND ActivoArticulo = 1";

            SqlParameter[] parametros = new SqlParameter[] {

            new SqlParameter("@ID_Articulo", SqlDbType.Int) { Value = idArticulo },
            new SqlParameter("@nombre", SqlDbType.NVarChar) { Value = nombre },
            new SqlParameter("@Precio", SqlDbType.Decimal) { Value = precio },
            new SqlParameter("@Categoria", SqlDbType.Int) { Value = idCategoria },
            new SqlParameter("@Marca", SqlDbType.Int) { Value = idMarca },

            };
           
            _accesoDB.EjecutarComando(consulta, parametros);
        }
    }
}
