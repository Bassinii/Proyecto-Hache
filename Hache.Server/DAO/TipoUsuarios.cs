﻿using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class TipoUsuarios
    {
        AccesoDB Acceso = new AccesoDB();

        public DataTable TablaTipoUsuarios()
        {
            DataTable Table = Acceso.ObtenerTabla("TipoUsuarios","SELECT ID_TipoUsuarios, Nombre from TipoUsuarios");

            return Table;
        }
    }
}
