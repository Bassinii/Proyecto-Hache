using Hache.Server.DAO;
using Hache.Server.Servicios.Articulos;
using Hache.Server.Servicios.ConexionDB;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Servicio test conexion DB
builder.Services.AddScoped<IConexionDB, ConexionDB>();

//Servicio articulos implementado en articuloscontroller
builder.Services.AddScoped<IArticuloService, ArticuloService>();

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
