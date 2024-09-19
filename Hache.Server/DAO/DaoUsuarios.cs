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
        public DataTable ObtenerUsuarioPorId(int idUsuario)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_Usuario, NombreCompleto, Usuario, ID_Local, CorreoElectronico FROM Usuarios  WHERE ID_Usuario = @ID_Usuario";

            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Usuario", SqlDbType.Int) { Value = idUsuario }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("Usuarios", consulta, parametros);
        }

    }
}
