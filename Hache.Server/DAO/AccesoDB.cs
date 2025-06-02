using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class AccesoDB
    {

        private readonly string RutaBD;

        public AccesoDB(IConfiguration config)
        {
            RutaBD = config["RutaBD:Cadena"] ?? throw new ArgumentNullException("Falta la cadena de conexión en secrets.json");
        }


        public string ObtenerCadenaConexion()
        {
            return RutaBD ?? throw new InvalidOperationException("La cadena de conexión no está configurada.");
        }

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


        public DataTable ObtenerTabla(string nombreTabla, string consulta, SqlParameter[] parametros = null)
        {
            using (SqlConnection connection = new SqlConnection(RutaBD))
            {
                using (SqlCommand command = new SqlCommand(consulta, connection))
                {
                    // Agregar los parámetros si existen
                    if (parametros != null)
                    {
                        command.Parameters.AddRange(parametros);
                    }

                    SqlDataAdapter adapter = new SqlDataAdapter(command);
                    DataTable tabla = new DataTable(nombreTabla);
                    adapter.Fill(tabla);
                    return tabla;
                }
            }
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

        public void EjecutarComando(string consulta, SqlParameter[] parametros)
        {
            using (SqlConnection connection = new SqlConnection(RutaBD))
            {
                using (SqlCommand command = new SqlCommand(consulta, connection))
                {
                    // Agregar los parámetros si existen
                    if (parametros != null)
                    {
                        command.Parameters.AddRange(parametros);
                    }

                    try
                    {
                        connection.Open();
                        command.ExecuteNonQuery(); // Ejecuta el comando
                    }
                    catch (SqlException sqlEx)
                    {
                        throw new Exception($"Error al ejecutar la consulta: {sqlEx.Message}", sqlEx);
                    }
                    catch (Exception ex)
                    {
                        throw new Exception("Error al ejecutar la consulta", ex);
                    }
                }
            }
        }

        public object EjecutarEscalar(string consulta, SqlParameter[] parametros = null)
        {
            using (SqlConnection connection = new SqlConnection(RutaBD))
            {
                using (SqlCommand command = new SqlCommand(consulta, connection))
                {
                    // Agregar los parámetros si existen
                    if (parametros != null)
                    {
                        command.Parameters.AddRange(parametros);
                    }

                    try
                    {
                        connection.Open();
                        return command.ExecuteScalar(); // Ejecuta la consulta y devuelve un único valor
                    }
                    catch (SqlException sqlEx)
                    {
                        throw new Exception($"Error al ejecutar la consulta escalar: {sqlEx.Message}", sqlEx);
                    }
                    catch (Exception ex)
                    {
                        throw new Exception("Error al ejecutar la consulta escalar", ex);
                    }
                }
            }
        }
    }
}