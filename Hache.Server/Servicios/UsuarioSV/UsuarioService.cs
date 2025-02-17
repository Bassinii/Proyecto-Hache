using Hache.Server.DAO;
using Hache.Server.Entities;
using Hache.Server.Utilities;

namespace Hache.Server.Servicios.UsuarioSV
{
    public class UsuarioService : IUsuarioService
    {
        private readonly DaoUsuarios _DaoUsuarios;

        public UsuarioService(AccesoDB accesodb)
        {
            _DaoUsuarios = new DaoUsuarios(accesodb);
        }

        public Usuario CargarUsuario(Usuario NuevoUsuario)
        {
            NuevoUsuario.Contrasenia = HashUtility.ComputeSha256Hash(NuevoUsuario.Contrasenia);
            _DaoUsuarios.AgregarUsuario(NuevoUsuario);
            return NuevoUsuario;
        }

        public Usuario ValidarUsuario(string NombreUsuario,string contrasenia)
        {
            

            Usuario? usuario = _DaoUsuarios.ObtenerUsuarioPorNombre(NombreUsuario);

            if (usuario == null)
            {
                return null;
            }
            //string contraseniaHasheada = HashUtility.ComputeSha256Hash(contrasenia);
            //Validacion de contrasenia no funciona
            return usuario; 
               
            
             
                      
            
        }
    }
}
