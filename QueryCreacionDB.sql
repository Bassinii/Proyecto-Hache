CREATE DATABASE Hache;
GO
USE Hache;
GO

 CREATE TABLE TiposDePedidos (
   ID_TipoPedido INT PRIMARY KEY IDENTITY(1,1),
   URL_Imagen VARCHAR(300) NULL,
   Nombre VARCHAR(50) NOT NULL
);

CREATE TABLE DiasTipoPedido (
    ID_TipoPedido INT,
    DiaSemana VARCHAR(15),
    FOREIGN KEY (ID_TipoPedido) REFERENCES TiposDePedidos(ID_TipoPedido)
);


CREATE TABLE Categorias (
    ID_Categoria INT IDENTITY(1,1) PRIMARY KEY,
    ID_TipoPedido INT NULL,
    Nombre VARCHAR(50) NOT NULL,
	ActivoCategoria BIT NOT NULL DEFAULT 1,  
    CONSTRAINT FK_Categorias_TiposDePedidos FOREIGN KEY (ID_TipoPedido) REFERENCES TiposDePedidos(ID_TipoPedido)
);


CREATE TABLE Marcas (
    ID_Marca INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
	ActivoMarca BIT NOT NULL DEFAULT 1,  
);

CREATE TABLE MediosDePago (
    ID_MedioDePago INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
	ActivoMedioDePago BIT NOT NULL DEFAULT 1, 
);

CREATE TABLE Locales (
    ID_Local INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(30) NOT NULL,
	ActivoLocal BIT NOT NULL DEFAULT 1,  
);

CREATE TABLE Articulos (
    ID_Articulo INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Precio_Unitario DECIMAL(8, 2) NOT NULL,
    ID_Categoria INT NOT NULL,
    ID_Marca INT NOT NULL,
	ActivoArticulo BIT NOT NULL DEFAULT 1,  
    CONSTRAINT FK_Articulos_Categorias FOREIGN KEY (ID_Categoria) REFERENCES Categorias(ID_Categoria),
    CONSTRAINT FK_Articulos_Marcas FOREIGN KEY (ID_Marca) REFERENCES Marcas(ID_Marca)
);

CREATE TABLE Imagenes (
    ID_Imagen INT IDENTITY(1,1) PRIMARY KEY,
    ID_Articulo INT NOT NULL,
    URL_Imagen VARCHAR(300) NOT NULL,
    CONSTRAINT FK_Imagenes_Articulos FOREIGN KEY (ID_Articulo) REFERENCES Articulos(ID_Articulo)
);

CREATE TABLE Ventas (
    ID_Venta INT IDENTITY(1,1) PRIMARY KEY,
    ID_Usuario INT NOT NULL,
    ID_Local INT NOT NULL,
    ID_MedioDePago INT NOT NULL,
    Fecha DATETIME DEFAULT GETDATE() NOT NULL,
    Hora TIME NULL,
    Subtotal DECIMAL(8,2) NOT NULL,
    Total DECIMAL(8, 2) NOT NULL,
    EsPedidosYa BIT NULL,
	ActivoVenta BIT NOT NULL DEFAULT 1,  
    CONSTRAINT FK_Ventas_Locales FOREIGN KEY (ID_Local) REFERENCES Locales(ID_Local),
    CONSTRAINT FK_Ventas_MediosDePago FOREIGN KEY (ID_MedioDePago) REFERENCES MediosDePago(ID_MedioDePago)
);

CREATE TABLE DetallesVentas (
    ID_Detalle INT IDENTITY(1,1) PRIMARY KEY,
    ID_Venta INT NOT NULL,
    ID_Articulo INT NOT NULL,
    Cantidad INT NOT NULL,
    Precio_Unitario DECIMAL(10, 2) NOT NULL,
    Precio_Venta DECIMAL(10, 2) NULL,
    CONSTRAINT FK_DetallesVentas_Ventas FOREIGN KEY (ID_Venta) REFERENCES Ventas(ID_Venta),
    CONSTRAINT FK_DetallesVentas_Articulos FOREIGN KEY (ID_Articulo) REFERENCES Articulos(ID_Articulo)
);

CREATE TABLE HistorialPrecios(
    ID_HistorialPrecios INT IDENTITY(1,1) PRIMARY KEY,
    ID_Articulo INT NOT NULL,
    Precio_Anterior DECIMAL(8,2),
    Precio_Nuevo DECIMAL(8,2),
    Fecha_Cambio DATE DEFAULT GETDATE(),
    CONSTRAINT FK_HistorialPrecios_Articulos FOREIGN KEY (ID_Articulo) REFERENCES Articulos(ID_Articulo)
);

CREATE TABLE TipoUsuarios(
    ID_TipoUsuario INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Usuarios (
    ID_Usuario INT IDENTITY(1,1) PRIMARY KEY,
    ID_TipoUsuario INT NOT NULL,
    ID_Local INT NULL,
    Usuario VARCHAR(50) NOT NULL UNIQUE,
    NombreCompleto VARCHAR(100) NOT NULL,
    Contrasenia VARCHAR(150) NOT NULL,
    CorreoElectronico VARCHAR(100) NOT NULL,
    ActivoUsuario BIT NOT NULL DEFAULT 1,
    CONSTRAINT FK_Usuarios_TipoUsuarios FOREIGN KEY(ID_TipoUsuario) REFERENCES TipoUsuarios(ID_TipoUsuario),
    CONSTRAINT FK_Usuarios_Locales FOREIGN KEY (ID_Local) REFERENCES Locales(ID_Local)
);

CREATE TABLE Stocks(
    ID_Stock INT IDENTITY(1,1) PRIMARY KEY,
    ID_Local INT NOT NULL,
    ID_Articulo INT NOT NULL,
    Cantidad INT NOT NULL,
    CONSTRAINT FK_Stocks_Locales FOREIGN KEY(ID_Local) REFERENCES Locales(ID_Local),
    CONSTRAINT FK_Stocks_Articulos FOREIGN KEY (ID_Articulo) REFERENCES Articulos(ID_Articulo)
);

CREATE TABLE Pedidos (
    ID_Pedido INT IDENTITY(1,1) PRIMARY KEY,
    ID_TipoPedido INT NOT NULL,
    ID_Local INT NOT NULL,
    Fecha DATETIME DEFAULT GETDATE() NOT NULL,
    Estado VARCHAR(50) NOT NULL, -- Estado del pedido (Ej: 'Pendiente', 'Enviado', 'Completado')
    Fecha_Entrega DATETIME NULL,
    CONSTRAINT FK_Pedidos_Locales FOREIGN KEY (ID_Local) REFERENCES Locales(ID_Local),
    CONSTRAINT FK_Pedidos_TiposDePedidos FOREIGN KEY (ID_TipoPedido) REFERENCES TiposDePedidos(ID_TipoPedido)
);

CREATE TABLE DetallesPedidos (
    ID_DetallePedido INT IDENTITY(1,1) PRIMARY KEY,
    ID_Pedido INT NOT NULL,
    ID_Articulo INT NOT NULL,
    Cantidad INT NOT NULL,
    Precio_Unitario DECIMAL(10, 2) NOT NULL,
    CONSTRAINT FK_DetallesPedidos_Pedidos FOREIGN KEY (ID_Pedido) REFERENCES Pedidos(ID_Pedido),
    CONSTRAINT FK_DetallesPedidos_Articulos FOREIGN KEY (ID_Articulo) REFERENCES Articulos(ID_Articulo)
);

CREATE TABLE TurnoCaja (
    ID_TurnoCaja INT IDENTITY(1,1) PRIMARY KEY,
    ID_Usuario INT NOT NULL,
    ID_Local INT NOT NULL,
    FechaApertura DATETIME NOT NULL,
    MontoApertura DECIMAL(10, 2) NOT NULL,
    FechaCierre DATETIME NULL,
    MontoCierre DECIMAL(10, 2) NULL,
    MontoRetiro DECIMAL(10, 2) NULL,
    Abierta BIT NOT NULL DEFAULT 1,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuario),
    FOREIGN KEY (ID_Local) REFERENCES Locales(ID_Local)
);

GO
