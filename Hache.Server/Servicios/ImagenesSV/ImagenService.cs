using Microsoft.Data.SqlClient;
using Hache.Server.DAO;
using Hache.Server.Entities; // Importa las entidades
using Hache.Server.Servicios.ConexionDB;
using System.Data;

namespace Hache.Server.Servicios.ImagenesSV
{
    public class ImagenService : IImagenService
    {

        private readonly DaoImagenes _DaoImagenes;

        public ImagenService(AccesoDB _accesoDB)
        {
            _DaoImagenes = new DaoImagenes(_accesoDB);
        }

        public List<Imagen> ObtenerTodasLasImagenes()
        {
            DataTable tablaImagenes = _DaoImagenes.tablaImagenes();
            List<Imagen> imagen = new List<Imagen>();

            foreach (DataRow row in tablaImagenes.Rows)
            {
                Imagen imagenes = new Imagen
                {
                    ID_Imagen = (int)row["ID_Imagen"],

                    url = row["URL_Imagen"]?.ToString() ?? string.Empty,
                };
                imagen.Add(imagenes);
            }
            return imagen;
        }
    }
}

