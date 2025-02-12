USE Hache;
GO

-- Inserci�n de datos en la tabla Categoriass
INSERT INTO Categorias (Nombre) VALUES 
('Panader�a'),
('Reposter�a');

-- Inserci�n de datos en la tabla Marcas
INSERT INTO Marcas (Nombre) VALUES 
('Hache'),
('Rochino'),
('Do�a Rosa'),
('Boutique'),
('Las Quinas');

INSERT INTO MediosDePago (Nombre) VALUES
('Efectivo'),
('Débito'),
('Crédito'),
('Mercado Pago');


-- Inserci�n de datos en la tabla Articulos
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES 
('Brownie', 3990.00, 2, 1),
('Lemonie', 2850.00, 2, 2),
('Frola', 2750.00, 2, 3),
('Pepas', 3100.00, 2, 4),
('Cookies Miel', 2900.00, 2, 5),
('Mini budin chocolate', 3200.00, 2, 1),
('Pan Integral', 4600.00, 1, 2),
('Pan semillas', 4600.00, 1, 3),
('Mini alfajor maicena', 4600.00, 1, 4);

-- Inserci�n de datos en la tabla Imagenes
INSERT INTO Imagenes (ID_Articulo, URL_Imagen) VALUES 
(1, 'assets/images/articles/cuadrado_brownie.jpeg'),
(2, 'assets/images/articles/lemonie.jpeg'),
(3, 'assets/images/articles/frola.jpeg'),
(4, 'assets/images/articles/pepas.jpeg'),
(5, 'assets/images/articles/galletitas_miel.jpeg'),
(6, 'assets/images/articles/mini_budin_chocolate.jpeg'),
(7, 'assets/images/articles/pan_integral.jpeg'),
(8, 'assets/images/articles/pan_semillas.jpeg'),
(9, 'assets/images/articles/mini_alfajor_maicena.jpeg');

-- Inserci�n de datos en la tabla TipoUsuarios
INSERT INTO TipoUsuarios (Nombre) VALUES 
('Administrador'),
('Vendedor');

-- Inserci�n de datos en la tabla Usuarios
INSERT INTO Usuarios (ID_TipoUsuario, Usuario, NombreCompleto, Contrasenia, CorreoElectronico) VALUES 
(1, 'Matute', 'Mateo Barrios', 'admin1', 'Matute@example.com'),
(1, 'admin2', 'Administrador Dos', 'adminpass2', 'admin2@example.com'),
(2, 'ventas1', 'Vendedor Uno', 'ventaspas1', 'ventas1@example.com'),
(2, 'ventas2', 'Vendedor Dos', 'ventaspas2', 'ventas2@example.com'),
(2, 'ventas3', 'Vendedor Tres', 'ventaspas3', 'ventas3@example.com');

INSERT INTO Locales (Nombre) VALUES 
('Don Torcuato'),
('Acassuso'),
('Vicente Lopez'),
('Lomas');

-- Inserci�n de datos en la tabla Ventas
INSERT INTO Ventas (ID_Usuario, Fecha, Subtotal, Total, EsPedidosYa, ID_Local, ID_MedioDePago) VALUES 
(1, GETDATE(), 4990.00, 4990.00, 0, 1, 1),
(2, GETDATE(), 4990.00, 4990.00, 0, 2, 3),
(3, GETDATE(), 4990.00, 4990.00, 0, 2, 1),
(4, GETDATE(), 4990.00, 4990.00, 1, 3, 1),
(5, GETDATE(), 6350.00, 6350.00, 0 ,1, 2),
(1, GETDATE(), 3990.00, 3990.00, 0, 2, 1),
(2, GETDATE(), 4600.00, 4600.00, 1, 2, 4),
(3, GETDATE(), 4600.00, 4600.00, 0, 1, 3),
(4, GETDATE(), 4600.00, 4600.00, 1, 3, 1),
(5, GETDATE(), 4600.00, 4600.00, 0, 3, 4);

INSERT INTO DetallesVentas (ID_Venta, ID_Articulo, Cantidad, Precio_Unitario, Porcentaje_Descuento) VALUES 
(4, 1, 1, 4990.00, NULL),
(3, 2, 1, 4990.00, NULL),
(3, 3, 1, 4990.00, NULL),
(4, 4, 1, 4990.00, NULL),
(5, 5, 1, 6350.00, NULL),
(6, 6, 1, 3990.00, NULL),
(7, 7, 1, 4600.00, NULL),
(8, 8, 1, 4600.00, NULL),
(9, 9, 1, 4600.00, NULL),
(10, 8, 1, 4600.00, NULL);


-- Inserci�n de datos en la tabla HistorialPrecios
INSERT INTO HistorialPrecios (ID_Articulo, Precio_Anterior, Precio_Nuevo) VALUES 
(1, 4500.00, 4990.00),
(2, 4500.00, 4990.00),
(3, 4500.00, 4990.00),
(4, 4500.00, 4990.00),
(5, 6000.00, 6350.00),
(6, 3500.00, 3990.00),
(7, 4200.00, 4600.00),
(8, 4200.00, 4600.00),
(9, 4200.00, 4600.00);



-- Inserci�n de datos en la tabla Stocks
INSERT INTO Stocks (ID_Local, ID_Articulo, Cantidad) VALUES 
(1, 1, 50),
(1, 2, 40),
(1, 3, 30),
(1, 4, 20),
(1, 5, 10),
(1, 6, 60),
(2, 1, 30),
(2, 2, 20),
(2, 3, 25),
(2, 4, 15),
(2, 5, 20),
(2, 6, 50),
(3, 1, 20),
(3, 2, 30),
(3, 3, 40),
(3, 4, 10),
(3, 5, 5),
(3, 6, 70);

-- Inserci�n de datos en la tabla Pedidos
INSERT INTO Pedidos (ID_Local, Fecha, Estado, Fecha_Entrega) VALUES 
(1, GETDATE(), 'Pendiente', NULL),
(2, GETDATE(), 'Enviado', GETDATE() + 3),
(3, GETDATE(), 'Completado', GETDATE() - 1),
(1, GETDATE(), 'Pendiente', NULL),
(2, GETDATE(), 'Enviado', GETDATE() + 2);

-- Inserci�n de datos en la tabla DetallesPedidos
INSERT INTO DetallesPedidos (ID_Pedido, ID_Articulo, Cantidad, Precio_Unitario) VALUES 
(1, 1, 2, 3990.00),
(1, 2, 1, 2850.00),
(2, 3, 3, 2750.00),
(2, 4, 1, 3100.00),
(3, 5, 2, 2900.00),
(3, 6, 1, 3200.00),
(4, 7, 4, 4600.00),
(4, 8, 1, 4600.00),
(5, 9, 2, 4600.00);
