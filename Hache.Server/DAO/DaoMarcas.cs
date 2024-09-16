﻿using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoMarcas
    {

        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoMarcas(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        public DataTable tablaMarcas()
        {
            string consulta = ("SELECT ID_Marca, Nombre from Marcas");
            return _accesoDB.ObtenerTabla("Marcas", consulta);
        }

    }
}
