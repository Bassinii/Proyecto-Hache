using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class Usuarios
    {
        AccesoDB Acceso = new AccesoDB();

        public DataTable TablaUsuarios()
        {
            DataTable Table = Acceso.ObtenerTabla("Usuarios","SELECT ID_Usuario, ID_TipoUsuario,Nombre, Contrasenia, CorreoElectronico, ID_Local from Usuarios");
            return Table;

        }

    }
}
