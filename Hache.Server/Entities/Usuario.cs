namespace Hache.Server.Entities
{
    public class Usuario
    {
        public int ID_Usuario { get; set; }
        public TipoUsuario TipoUsuario { get; set; } = new TipoUsuario();
        public string NombreUsuario { get; set; }
        public string Contrasenia { get; set; } = string.Empty;
        public string CorreoElectronico { get; set; } 
        public string NombreCompleto { get; set; } 
        public int ID_Local { get; set; } 

        public Usuario() { }

    }
}
