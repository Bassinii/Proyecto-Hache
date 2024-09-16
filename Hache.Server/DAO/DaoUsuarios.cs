using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoUsuarios
    {

        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoUsuarios(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        public DataTable tablaUsuarios()
        {
            string consulta = ("SELECT ID_Usuario, ID_TipoUsuario,Nombre, Contrasenia, CorreoElectronico, ID_Local from Usuarios");
            return _accesoDB.ObtenerTabla("Usuarios", consulta);
        }

    }
}
