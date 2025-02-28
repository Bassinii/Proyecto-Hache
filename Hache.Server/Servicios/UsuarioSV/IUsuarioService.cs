using Hache.Server.DAO;
using Hache.Server.Entities;
using System.Runtime.Intrinsics.Arm;

namespace Hache.Server.Servicios.UsuarioSV
{
    public interface IUsuarioService
    {
        List<Usuario> ObtenerTodosLosUsuarios();
        public Usuario CargarUsuario(Usuario NuevoUsuario);

        public Usuario ValidarUsuario(string NombreUsuario, string Contrasenia);

        public void ActualizarUsuario(Usuario usuario);

        public void BajaUsuario(int idUsuario);
    }
}
