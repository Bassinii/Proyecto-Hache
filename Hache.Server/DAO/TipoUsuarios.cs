﻿using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoTipoUsuarios
    {

        AccesoDB Acceso = new AccesoDB();

        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoTipoUsuarios(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        public DataTable tablaTipoUsuarios()
        {
            string consulta = ("SELECT ID_TipoUsuarios, Nombre from TipoUsuarios");
            return _accesoDB.ObtenerTabla("TipoUsuarios", consulta);
        }
    }
}
