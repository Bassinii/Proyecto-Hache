using Hache.Server.Entities;
using Microsoft.Data.SqlClient;
using System;
using System.Data;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
            string consulta = ("SELECT ID_Usuario, ID_TipoUsuario,NombreCompleto, Contrasenia, CorreoElectronico, ID_Local from Usuarios");
            return _accesoDB.ObtenerTabla("Usuarios", consulta);
        }
        public DataTable ObtenerUsuarioPorId(int idUsuario)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_Usuario, NombreCompleto, ID_Local, CorreoElectronico FROM Usuarios  WHERE ID_Usuario = @ID_Usuario";

            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Usuario", SqlDbType.Int) { Value = idUsuario }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("Usuarios", consulta, parametros);
        }
        
        public void AgregarUsuario(Usuario usuario)
        {
            SqlParameter[] parametros = new SqlParameter[]
            {
            new SqlParameter("@ID_TipoUsuario", SqlDbType.Int) { Value = usuario.TipoUsuario.ID_TipoUsuario },
            new SqlParameter("@NombreCompleto", SqlDbType.NVarChar, 50) { Value = usuario.NombreCompleto },
            new SqlParameter("@Usuario", SqlDbType.NVarChar, 50) { Value = usuario.NombreUsuario },
            new SqlParameter("@Contrasenia", SqlDbType.NVarChar, 50) { Value = usuario.Contrasenia },
            new SqlParameter("@CorreoElectronico", SqlDbType.NVarChar, 100) { Value = usuario.CorreoElectronico },
            new SqlParameter("@ID_Local", SqlDbType.Int) { Value = usuario.ID_Local}
            };

            _accesoDB.EjecutarComando("INSERT INTO USUARIOS (ID_TipoUsuario,NombreCompleto, Usuario, CorreoElectronico,ID_Local, Contrasenia ) "
                + "VALUES(@ID_TipoUsuario, @NombreCompleto, @Usuario, @CorreoElectronico, @ID_Local, @contrasenia )",parametros);

        } 


    }
}

