using Hache.Server.DAO;
using Hache.Server.Entities;
using System.Runtime.Intrinsics.Arm;

namespace Hache.Server.Servicios.UsuarioSV
{
    public interface IUsuarioService
    {
        public Usuario CargarUsuario(Usuario NuevoUsuario);
    }
}
