using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class AccesoDB
    {
        private readonly string RutaBD = "Data Source=localhost\\SQLEXPRESS;Initial Catalog=Hache;Integrated Security=True;TrustServerCertificate=True";

        public SqlConnection ObtenerConexion()
        {
            SqlConnection cn = new SqlConnection(RutaBD);
            try
            {
                cn.Open();
                Console.WriteLine("Conexión exitosa a la base de datos.");
                return cn;
            }
            catch (Exception ex)
            {
                // Log del error 
                Console.WriteLine($"ERROR: {ex.Message}");

                // Lanza la excepción para que sea manejada por el controlador
                throw; 
            }
        }

        public SqlDataAdapter ObtenerAdaptador(String Consulta, SqlConnection cons)
        {
            SqlDataAdapter adaptador;
            try
            {
                adaptador = new SqlDataAdapter(Consulta, cons);

                return adaptador;
            }
            catch (Exception ex)
            {
                // Log del error 
                Console.WriteLine($"ERROR: {ex.Message}");

                // Lanza la excepción para que sea manejada por el controlador
                throw; 
            }
        }
        public DataTable ObtenerTabla(String NombreTabla, String Consulta)
        {
            DataSet ds = new DataSet();

            SqlConnection Cons = ObtenerConexion();

            SqlDataAdapter adapt = ObtenerAdaptador(Consulta, Cons);

            adapt.Fill(ds, NombreTabla);

            Cons.Close();

            return ds.Tables[NombreTabla];
        }

        public int EjecutarProcedimientoAlmacenado(SqlCommand Comando, string NombreSP)
        {
            int FilasAfectadas;

            SqlConnection con = ObtenerConexion();

            SqlCommand com = new SqlCommand();

            com = Comando;

            com.Connection = con;

            com.CommandType = CommandType.StoredProcedure;

            com.CommandText = NombreSP;

            FilasAfectadas = com.ExecuteNonQuery();

            con.Close();
            return FilasAfectadas;
        }

        public Boolean Exist(String Consulta)
        {
            Boolean estado = false;

            SqlConnection cons = ObtenerConexion();

            SqlCommand com = new SqlCommand(Consulta, cons);

            SqlDataReader re = com.ExecuteReader();

            if (re.Read())
            {
                estado = true;
            }
            return estado;
        }

    }
}