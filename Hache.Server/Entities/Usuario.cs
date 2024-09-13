namespace Hache.Server.Entities
{
    public class Usuario
    {
        public int ID_Usuario { get; set; }
        public int ID_TipoUsuario { get; set; }
        public String NombreUsuario { get; set; } = String.Empty;
        public String Contrasenia { get; set; } = String.Empty;
        public String CorreoElectronico { get; set; } = String.Empty;

        public Usuario() { }

    }
}
