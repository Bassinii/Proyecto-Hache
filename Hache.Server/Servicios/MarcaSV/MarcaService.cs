using Microsoft.Data.SqlClient;
using Hache.Server.DAO;
using Hache.Server.Entities; // Importa las entidades

using System.Data;

namespace Hache.Server.Servicios.MarcaSV
{
    public class MarcaService : IMarcaService
    {
        private readonly DaoMarcas _DaoMarcas;

        public MarcaService(AccesoDB accesoDB)
        {
            _DaoMarcas = new DaoMarcas(accesoDB);
        }

        public List<Marca> ObtenerTodasLasMarcas()
        {
            DataTable tablaMarca = _DaoMarcas.tablaMarcas();
            List<Marca> marcas = new List<Marca>();

            foreach (DataRow row in tablaMarca.Rows) {

                Marca marca = new Marca
                {
                    ID_Marca = (int)row["ID_Marca"],

                    nombre = row["Nombre"]?.ToString() ?? string.Empty,
                };
                marcas.Add(marca);
            }
            return marcas;

        }
    }
}
