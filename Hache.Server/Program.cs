using Hache.Server.DAO;
using Hache.Server.JwtSecurity;
using Hache.Server.Servicios.ArticulosSV;
using Hache.Server.Servicios.CategoriasSV;
using Hache.Server.Servicios.HistorialPreciosSV;
using Hache.Server.Servicios.ImagenesSV;
using Hache.Server.Servicios.LocalSV;
using Hache.Server.Servicios.MarcaSV;
using Hache.Server.Servicios.PedidoSV;
using Hache.Server.Servicios.StockSV;
using Hache.Server.Servicios.UsuarioSV;
using Hache.Server.Servicios.VentaSV;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;




var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Agrega los servicios CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        policy =>
        {
            policy.WithOrigins("https://127.0.0.1:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//Servicios para acceso de datos de entities transformados en lista para los controllers.
builder.Services.AddScoped<IArticuloService, ArticuloService>();

builder.Services.AddScoped<ICategoriaService, CategoriaService>();

builder.Services.AddScoped<IImagenService, ImagenService>();

builder.Services.AddScoped<IMarcaService, MarcaService>();

builder.Services.AddScoped<ILocalService,LocalService>();

builder.Services.AddScoped<IPedidoService, PedidoService>();

builder.Services.AddScoped<IVentaService, VentaService>();

builder.Services.AddScoped<IHistorialPrecioService, HistorialPrecioService>();

builder.Services.AddScoped<IStockService, StockService>();

builder.Services.AddScoped<IUsuarioService, UsuarioService>();  

builder.Services.AddScoped<AccesoDB>();

builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));

var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();

// Configurar JwtService
builder.Services.AddSingleton<JwtService>();

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings.Issuer,
            ValidAudience = jwtSettings.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey))
        };
    }); ;


builder.Services.AddAuthorization();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Usa la política CORS configurada
app.UseCors("AllowSpecificOrigins");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
