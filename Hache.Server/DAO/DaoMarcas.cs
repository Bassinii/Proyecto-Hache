using Hache.Server.Entities;
using Microsoft.Data.SqlClient;
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
            string consulta = ("SELECT ID_Marca, Nombre from Marcas WHERE ActivoMarca=1");
            return _accesoDB.ObtenerTabla("Marcas", consulta);
        }

        public DataTable ObtenerMarcaPorId(int idMarca)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_Marca, Nombre FROM Marcas WHERE ID_Marca = @ID_Marca AND ActivoMarca=1";

            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Marca", SqlDbType.Int) { Value = idMarca }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("Marcas", consulta, parametros);
        }

        public void AgregarMarca(Marca marca)
        {
            SqlParameter[] parametros = new SqlParameter[]
            {
            new SqlParameter("@Nombre", SqlDbType.NVarChar, 50) { Value = marca.nombre },

            };

            _accesoDB.EjecutarComando("INSERT INTO Marcas(Nombre) "
                + "VALUES(@Nombre)", parametros);
        }

        public void BajaMarca(int idMarca)
        {
            string consulta = "UPDATE Marcas SET ActivoMarca = 0 WHERE ID_Marca = @ID_Marca";

            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Marca", SqlDbType.Int) { Value = idMarca }
            };

            _accesoDB.EjecutarComando(consulta, parametros);    
        }


    }
}
