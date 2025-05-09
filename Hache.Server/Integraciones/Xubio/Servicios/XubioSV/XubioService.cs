using Hache.Server.Integraciones.Xubio.DTO;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;

namespace Hache.Server.Integraciones.Xubio.Servicios.XubioSV
{
    public class XubioService : IXubioService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;

        public XubioService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }

        public async Task<string> ObtenerAccessTokenAsync()
        {
            var clientId = _config["Xubio:ClientId"];
            var secretId = _config["Xubio:SecretId"];
            var authString = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{clientId}:{secretId}"));

            var request = new HttpRequestMessage(HttpMethod.Post, "https://xubio.com/API/1.1/TokenEndpoint");
            request.Headers.Authorization = new AuthenticationHeaderValue("Basic", authString);
            request.Content = new StringContent("grant_type=client_credentials", Encoding.UTF8, "application/x-www-form-urlencoded");

            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();
            var tokenObj = JsonConvert.DeserializeObject<AccessTokenResponse>(json);

            return tokenObj.AccessToken;
        }

        public async Task<T> CrearComprobanteVentaAsync<T>(ComprobanteVentaDTO dto)
        {
            var token = await ObtenerAccessTokenAsync();
            var request = new HttpRequestMessage(HttpMethod.Post, "https://xubio.com/API/1.1/facturar");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var json = JsonConvert.SerializeObject(dto);
            request.Content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();
            var createdObject = JsonConvert.DeserializeObject<T>(responseContent);

            return createdObject;
        }

        public async Task<bool> EliminarComprobanteVentaAsync(long id)
        {
            var token = await ObtenerAccessTokenAsync();
            var request = new HttpRequestMessage(HttpMethod.Delete, $"https://xubio.com/API/1.1/comprobanteVentaBean/{id}");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var response = await _httpClient.SendAsync(request);

            // Devuelve true si fue exitoso (código 2xx), false si no
            return response.IsSuccessStatusCode;
        }

    }
}
