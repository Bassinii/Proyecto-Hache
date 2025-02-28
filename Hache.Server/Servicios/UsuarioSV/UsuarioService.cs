using Hache.Server.DAO;
using Hache.Server.Entities;
using Hache.Server.Utilities;
using System.Data;
using System.Diagnostics;

namespace Hache.Server.Servicios.UsuarioSV
{
    public class UsuarioService : IUsuarioService
    {
        private readonly DaoUsuarios _DaoUsuarios;

        public UsuarioService(AccesoDB accesodb)
        {
            _DaoUsuarios = new DaoUsuarios(accesodb);
        }

        public List<Usuario> ObtenerTodosLosUsuarios()
        {
           
                DataTable tablaUsuarios = _DaoUsuarios.tablaUsuarios();
                List<Usuario> usuarios = new List<Usuario>();

            foreach (DataRow row in tablaUsuarios.Rows)
            {
                int idUsuario = (int)row["ID_Usuario"];

                Usuario usuario = new Usuario
                {
                    ID_Usuario = idUsuario,

                    NombreUsuario = row["Usuario"].ToString() ?? string.Empty,

                    ID_Local = Convert.ToInt32(row["ID_Local"]),

                    TipoUsuario = new TipoUsuario { ID_TipoUsuario = Convert.ToInt32(row["ID_TipoUsuario"]) },   
                    
                    CorreoElectronico = row["CorreoElectronico"].ToString() ?? string.Empty,

                    NombreCompleto = row["NombreCompleto"].ToString() ?? string.Empty

                };
                usuarios.Add(usuario);
            }
                return usuarios;                
        }

        public Usuario CargarUsuario(Usuario NuevoUsuario)
        {
            NuevoUsuario.Contrasenia = HashUtility.ComputeSha256Hash(NuevoUsuario.Contrasenia).Trim();
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

            string contraseniaHasheada = HashUtility.ComputeSha256Hash(contrasenia);

            if (usuario.Contrasenia.Trim() != contraseniaHasheada.Trim())
            {
                return null;
            }
            else
            {
                return usuario;
            }

        }
        public void ActualizarUsuario(Usuario usuario)
        {
            int tipoUsuario = usuario.TipoUsuario.ID_TipoUsuario; 
            _DaoUsuarios.ModificarUsuario(usuario.ID_Usuario, usuario.NombreCompleto, usuario.CorreoElectronico, tipoUsuario, usuario.ID_Local);
        }

        public void BajaUsuario(int idUsuario)
        {
            _DaoUsuarios.BajaUsuario(idUsuario);
        }

    }
}
