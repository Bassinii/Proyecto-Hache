using Microsoft.Data.SqlClient;
using Hache.Server.DAO;
using Hache.Server.Entities; // Importa las entidades
using System.Data;

namespace Hache.Server.Servicios.CategoriasSV
{
    public class CategoriaService : ICategoriaService
    {

        private readonly DaoCategorias _DaoCategorias;

        public CategoriaService(AccesoDB _accesoDB)
        {
            _DaoCategorias = new DaoCategorias(_accesoDB);
        }

        public List<Categoria> ObtenerTodasLasCategorias()
        {
            DataTable tablaCategorias = _DaoCategorias.tablaCategoria();
            List<Categoria> Categorias = new List<Categoria>();

            foreach (DataRow row in tablaCategorias.Rows)
            {
                Categoria categoria = new Categoria
                {
                    ID_Categoria = (int)row["ID_Categoria"],

                    ID_TipoPedido = row["ID_TipoPedido"] != DBNull.Value ? (int)row["ID_TipoPedido"] : 0,

                    Nombre = row["Nombre"]?.ToString() ??string.Empty,
                };
                Categorias.Add(categoria);
            }
            return Categorias;
        }

        public Categoria AgregarCategoria(Categoria categoria)
        {
            _DaoCategorias.AgregarCategoria(categoria);
            return categoria;
        }

        public void BajaCategoria(int idCategoria)
        {
            _DaoCategorias.BajaCategoria(idCategoria);  
        }
    }
}
