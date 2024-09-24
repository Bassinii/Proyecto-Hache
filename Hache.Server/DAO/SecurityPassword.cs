using System.Text;
using System;
using System.Security.Cryptography;

namespace Hache.Server.DAO
{
    public class SecurityPassword
    {

        // Función para computar el hash SHA-256 de una cadena
        public static string ComputeSha256Hash(string rawData)
        {
            // Crear una instancia de SHA256
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // Convertir la cadena a un arreglo de bytes
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));

                // Convertir los bytes a formato hexadecimal
                StringBuilder builder = new StringBuilder();
                foreach (var byteValue in bytes)
                {
                    builder.Append(byteValue.ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}
