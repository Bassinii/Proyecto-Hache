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
            string consulta = "SELECT ID_Imagen, URL_Imagen FROM Imagenes  WHERE ID_Imagen = @ID_Imagen";

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

            string consulta = "SELECT ID_Imagen, URL_Imagen, ID_Articulo FROM Imagenes  WHERE ID_Articulo = @ID_Articulo";

            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Articulo", SqlDbType.Int) { Value = idArticulo }
            };

            return _accesoDB.ObtenerTabla("Imagenes", consulta, parametros);
        }

        public List<Imagen> ObtenerImagenesPorIdArticuloLista(int idArticulo)
        {
            DataTable dataTable = ObtenerImagenPorIdArticulo(idArticulo);

            List<Imagen> imagenes = new List<Imagen>();

            foreach (DataRow row in dataTable.Rows)
            {
                Imagen imagen = new Imagen
                {
                    ID_Imagen = (int)row["ID_Imagen"],
                    ID_Articulo = (int)row["ID_Articulo"],
                    url = row["URL_Imagen"]?.ToString() ?? string.Empty
                };
                imagenes.Add(imagen);
            }

            return imagenes;
        }


        //Esta funcion recibe un vector de imagenes y las sube todas a la DB
        public void AgregarImagenes(List<Imagen> imagenes)
        {
            string consulta = "INSERT INTO Imagenes (ID_Articulo, URL_Imagen) VALUES (@ID_Articulo, @URL_Imagen)";

            foreach (Imagen imagen in imagenes)
            {
                SqlParameter[] parametros = new SqlParameter[] {
                    new SqlParameter ("@ID_Articulo", SqlDbType.Int) {Value= imagen.ID_Articulo},
                    new SqlParameter ("@URL_Imagen", SqlDbType.VarChar, 300) { Value = imagen.url}
                };

                _accesoDB.EjecutarComando(consulta, parametros);

            }
        }
    }
}

