using Hache.Server.DAO;
using Hache.Server.Servicios.ArticulosSV;
using Hache.Server.Servicios.CategoriasSV;
using Hache.Server.Servicios.ConexionDB;
using Hache.Server.Servicios.ImagenesSV;
using Hache.Server.Servicios.LocalSV;
using Hache.Server.Servicios.MarcaSV;
using Hache.Server.Servicios.PedidoSV;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Servicio test conexion DB
builder.Services.AddScoped<IConexionDB, ConexionDB>();

//Servicios para acceso de datos de entities transformados en lista para los controllers.
builder.Services.AddScoped<IArticuloService, ArticuloService>();

builder.Services.AddScoped<ICategoriaService, CategoriaService>();

builder.Services.AddScoped<IImagenService, ImagenService>();

builder.Services.AddScoped<IMarcaService, MarcaService>();

builder.Services.AddScoped<ILocalService,LocalService>();

builder.Services.AddScoped<IPedidoService, PedidoService>();

builder.Services.AddScoped<AccesoDB>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
