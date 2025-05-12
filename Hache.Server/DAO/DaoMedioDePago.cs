using Hache.Server.Entities;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoMedioDePago
    {
        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoMedioDePago(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        public DataTable tablaMediosDePago()
        {
            string consulta = ("SELECT ID_MedioDePago, Nombre from MediosDePago WHERE ActivoMedioDePago=1");
            return _accesoDB.ObtenerTabla("MediosDePago", consulta);
        }

        public DataTable tablaMediosDePagoTodos()
        {
            string consulta = ("SELECT ID_MedioDePago, Nombre from MediosDePago");
            return _accesoDB.ObtenerTabla("MediosDePago", consulta);
        }


        public DataTable ObtenerMedioDePagoPorId(int idMedioDePago)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_MedioDePago, Nombre FROM MediosDePago WHERE ID_MedioDePago = @ID_MedioDePago AND ActivoMedioDePago=1";

            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_MedioDePago", SqlDbType.Int) { Value = idMedioDePago }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("MediosDePago", consulta, parametros);
        }

        public void AgregarMedioDePago(MedioDePago medioDePago)
        {
            SqlParameter[] parametros = new SqlParameter[]
            {
            new SqlParameter("@Nombre", SqlDbType.NVarChar, 50) { Value = medioDePago.Nombre },

            };

            _accesoDB.EjecutarComando("INSERT INTO MediosDePago(Nombre) "
                + "VALUES(@Nombre)", parametros);
        }

        public void BajaMedioDePago(int idMedioDePago)
        {
            string consulta = "UPDATE MediosDePago SET ActivoMedioDePago = 0 WHERE ID_MedioDePago = @ID_MedioDePago";

            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_MedioDePago", SqlDbType.Int) { Value = idMedioDePago }
            };

            _accesoDB.EjecutarComando(consulta, parametros);
        }
    }
}
