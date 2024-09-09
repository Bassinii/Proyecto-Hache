namespace Hache.Server.Entities
{
    public class Usuarios
    {
        string ID_Usuario;
        string ID_TipoUsuario;
        string NombreUsuario;
        string Contrasenia;
        string CorreoElectronico;


        //ID_Usuario, ID_TipoUsuario,Nombre, Contrasenia, CorreoElectronico, ID_Local
            public Usuarios() { }

        //SETS
        public void setIDUsuario(String IDusu) { ID_Usuario = IDusu; }
        public void setTipoUsuario(String IdTipoUs) { ID_TipoUsuario = IdTipoUs; }
        public void setNombreUsuarios(String Usuario) { NombreUsuario = Usuario; }
        public void setContrasenia(String ContraseniaUsu) { Contrasenia = ContraseniaUsu; }
        public void setCorreoElectronico(String Correo) { CorreoElectronico = Correo; }

        //GETS

        public String getIdUsuario() { return ID_Usuario; }
        public String getIdTipoUsuario() { return ID_TipoUsuario; }
        public String getNombreUsuario() { return NombreUsuario; }
        public String getContrasenia() { return Contrasenia; }
        public String GetCorreoElectronico() { return CorreoElectronico; }
       


    }
}
