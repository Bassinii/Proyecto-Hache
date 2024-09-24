namespace Hache.Server.Entities
{
    public class Usuario
    {
        public int ID_Usuario { get; set; }
        public TipoUsuario TipoUsuario { get; set; } = new TipoUsuario();
        public string NombreUsuario { get; set; } = string.Empty;
        public string Contrasenia { get; set; } = string.Empty;
        public string CorreoElectronico { get; set; } = string.Empty;
        public string NombreCompleto { get; set; } = string.Empty;
        public int ID_Local { get; set; } 

        public Usuario() { }

    }
}
