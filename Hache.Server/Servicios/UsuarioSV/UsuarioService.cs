using Hache.Server.DAO;
using Hache.Server.Entities;

namespace Hache.Server.Servicios.UsuarioSV
{
    public class UsuarioService:IUsuarioService
    {
        private readonly DaoUsuarios _DaoUsuarios;

        public UsuarioService (AccesoDB accesodb)
        {
            _DaoUsuarios = new DaoUsuarios(accesodb);
        }

        public Usuario CargarUsuario(Usuario NuevoUsuario)
        {
            _DaoUsuarios.AgregarUsuario(NuevoUsuario);
            return NuevoUsuario;
        }
    }
}
