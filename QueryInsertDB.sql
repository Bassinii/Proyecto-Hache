USE Hache;

INSERT INTO TiposDePedidos (Nombre, URL_Imagen) VALUES 
('Panes', 'assets/images/pedidos/panes.jpg'),
('Elaboración propia', 'assets/images/pedidos/elaboracion_propia.jpg'),
('Productos de terceros', 'assets/images/pedidos/terceros.jpg'),
('Medialunas', 'assets/images/pedidos/medialunas.jpg'),
('Rochino', 'assets/images/pedidos/rochino.png');



GO

-- Panes: Lunes, Martes, Miércoles, Jueves, Sábado
INSERT INTO DiasTipoPedido (ID_TipoPedido, DiaSemana) VALUES
(1, 'Lunes'),
(1, 'Martes'),
(1, 'Miércoles'),
(1, 'Jueves'),
(1, 'Sábado');

-- Elaboración propia: Miércoles y Sábado
INSERT INTO DiasTipoPedido (ID_TipoPedido, DiaSemana) VALUES
(2, 'Miércoles'),
(2, 'Sábado');

-- Productos de terceros: solo Sábado
INSERT INTO DiasTipoPedido (ID_TipoPedido, DiaSemana) VALUES
(3, 'Sábado');

-- Medialunas: solo Sábado
INSERT INTO DiasTipoPedido (ID_TipoPedido, DiaSemana) VALUES
(4, 'Sábado');

-- Rochino: solo Sábado
INSERT INTO DiasTipoPedido (ID_TipoPedido, DiaSemana) VALUES
(5, 'Sábado');


GO

-- Inserci�n de datos en la tabla Categoriass
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (2, 'ALFAJOR GRANDE');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (2, 'MINI ALFAJOR');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (2, 'BUDIN GRANDE');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (2, 'MINI BUDIN');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (2, 'CUADRADOS');
INSERT INTO Categorias (ID_TipoPedido, Nombre ) VALUES (2, 'BANDEJAS');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (2, 'GALLETITAS');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (4, 'FACTURAS');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (1, 'PAN Y CHIPA');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (2, 'COMIDAS');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (3, 'FRACCIONADOS');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (3, 'MERMELADAS Y OTROS');
INSERT INTO Categorias (Nombre) VALUES ('OTRO');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (3, 'LECHES');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (3, 'BARRITAS Y GRANOLA');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (3, 'TOSTADAS');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (3, 'SNAKS');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (3, 'CITRIC');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (3, 'SALVADOR');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (5, 'ROCHINO PASTAS');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (5, 'ROCHINO PIZZAS');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (5, 'ROCHINO MILANESAS');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (5, 'ROCHINO LISTO ');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (5, 'ROCHINO SALSAS');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (3, 'PASTAS SECAS DOÑA ROSA');
INSERT INTO Categorias (ID_TipoPedido, Nombre) VALUES (3, 'PASTAS CONGELADAS DOÑA ROSA');

-- Inserci�n de datos en la tabla Marcas
INSERT INTO Marcas (Nombre) VALUES ('HACHE');
INSERT INTO Marcas (Nombre) VALUES ('LAS QUINAS');
INSERT INTO Marcas (Nombre) VALUES ('BROCAL');
INSERT INTO Marcas (Nombre) VALUES ('NINAS');
INSERT INTO Marcas (Nombre) VALUES ('OTRO');
INSERT INTO Marcas (Nombre) VALUES ('COCOON');
INSERT INTO Marcas (Nombre) VALUES ('AMANDE');
INSERT INTO Marcas (Nombre) VALUES ('ZAFRAN');
INSERT INTO Marcas (Nombre) VALUES ('WIK');
INSERT INTO Marcas (Nombre) VALUES ('SHIVA');
INSERT INTO Marcas (Nombre) VALUES ('CITRIC');
INSERT INTO Marcas (Nombre) VALUES ('SALVADOR');
INSERT INTO Marcas (Nombre) VALUES ('ROCHINO');
INSERT INTO Marcas (Nombre) VALUES ('DOÑA ROSA');

INSERT INTO MediosDePago (Nombre) VALUES
('Efectivo'),
('Débito'),
('Crédito'),
('Mercado Pago');


-- Inserci�n de datos en la tabla Articulos
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('ALFAJOR MAICENA', 3150, 1, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('ALFAJOR ROGEL', 2500, 1, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('ALFAJOR SABLEE', 2750, 1, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('ALFAJOR CHOCO', 2750, 1, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('MINI ALFAJOR MAICENA', 4700, 2, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('MINI ROGEL', 4100, 2, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('MINI ALFAJOR SABLEE', 4700, 2, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('MINI ALFAJOR CHOCO', 4700, 2, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('MINI ALFAJOR MIXTO ', 4700, 2, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('BUDIN GRANDE CARROT', 6500, 3, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('BUDIN GRANDE CHOCO', 6500, 3, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('BUDIN GRANDE LIMON', 6500, 3, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('BUDIN GRANDE NARANJA', 6500, 3, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('BUDIN MINI CARROT', 3150, 4, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('BUDIN MINICHOCO', 3150, 4, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('BUDIN MINI LIMON', 3150, 4, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('BUDIN MINI NARANJA', 3150, 4, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('BROWNIE', 4750, 5, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('FROLA', 3450, 5, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('COCO Y DDL', 3950, 5, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('LEMONIE', 3450, 5, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('BOCADO DE BROWNIES', 3450, 5, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('BANDEJA CLASICA', 8300, 6, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('BANDEJA CON COCO', 8650, 6, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('PEPAS', 3550, 7, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('ALMENDRA', 3500, 7, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('CHOCO', 3600, 7, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('MIEL', 3100, 7, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('COOKIE CLASICA', 3300, 7, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('COOKIE CHOCO CHIPS BLANCOS', 3300, 7, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('MARINERAS', 2550, 7, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('MARINERAS DE QUESO', 3200, 7, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('FACTURAS', 1500, 8, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('MEDIALUNAS', 1500, 8, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('PAN BLANCO', 6500, 9, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('PAN SEMILLAS', 6500, 9, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('PAN NEGRO', 6750, 9, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('PAN FOCACCIOA', 4900, 9, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('PAN HAMBURGUESAS', 4500, 9, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('FIGACITAS', 880, 9, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('CHIPA', 5100, 9, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('TARTA VERDURA', 6500, 10, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('TARTA CALABAZA', 6500, 10, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('TARTA DE JAMON Y QUESO', 6500, 10, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('EMPANADA DE JAMON Y QUESO', 3100, 10, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('EMPANADA CARNE', 3100, 10, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('EMPANADA VERDURA', 3100, 10, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('REBOZADOR X 1/2 KILO', 2950, 11, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('PREMEZCLA X 1/2 KILO', 3200, 11, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('MIX SALADO 150 G', 1400, 11, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('MIX FRUTOS SECOS', 2500, 11, 1);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('LAS QUINAS MERMELADA', 5460, 12, 2);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('LAS QUINAS MERMELADA SIN AZUCAR', 6370, 12, 2);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('LAS QUINAS DULCE DE LECHE', 5460, 12, 2);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('LAS QUINAS MIEL LIQUIDA', 5460, 12, 2);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('LAS QUINAS MIEL CREMOSA', 5460, 12, 2);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('BROCAL MERMELADA ', 4350, 12, 3);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('BROCAL MERMELADA LIGHT', 5550, 12, 3);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('NINAS', 4500, 12, 4);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('MANTEQUILLA CON D/LECHE', 5460, 13, 5);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('COCOON', 5300, 14, 6);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('AMANDE ALMENDRAS', 6650, 14, 7);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('BARRITAS ZAFRAN', 1270, 15, 8);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('BARRITAS WIK', 900, 15, 9);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('BARRITAS WIK PROTEICAS', 1570, 15, 9);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('GRANOLA FUERZA', 6290, 15, 5);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('GRANOLA EQUILIBRIO', 6290, 15, 5);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('CRAKINES', 1600, 16, 5);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('SHIVA SEMILLA', 2900, 16, 10);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('SHIVA MEDITERRANEA', 3450, 16, 10);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('SHIVA PIMENTON', 2900, 16, 10);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('SHIVA TOSTI', 3280, 16, 10);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('SHIVA CARBON', 2900, 16, 10);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('PAPAS BOUTIQUE', 2290, 17, 5);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('MANI HONEY', 5000, 17, 5);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('NARANJA X 250', 1200, 18, 11);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('NARANJA X500', 2000, 18, 11);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('NARANJA Y DURAZNO X 500', 2000, 18, 11);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('NARANAJA Y MANGO X 500', 2000, 18, 11);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('POMELO X 500', 2000, 18, 11);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('NARANAJA Y FRUTILLA X 500', 2000, 18, 11);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('MANZANA X 500', 2000, 18, 11);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('LIMONADA Y MENTA X 500', 1200, 18, 11);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('NARANJA Y ZANAHORIA X 500', 2400, 18, 11);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('AGUA SIN GAS', 2000, 19, 12);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('AGUA CON GAS', 2000, 19, 12);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('CREPES JYQ', 6200, 20, 13);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('CREPES CALABAZA', 6200, 20, 13);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('CREPES VERDURA', 6200, 20, 13);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('RAVIOLES CALABAZA Y QUESO', 7100, 20, 13);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('RAVIOLES JYQ', 7100, 20, 13);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('RAVIOLES VERDURA Y MUZZ', 7100, 20, 13);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('FIDEOS AL HUEVO', 4800, 20, 13);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('ÑOQUIS DE PAPA', 4800, 20, 13);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('PIZZA FUGAZETTA', 7500, 21, 13);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('PIZZA QUESO MOZZARELLA', 6500, 21, 13);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('MILANESAS DE PECETO', 10400, 22, 13);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('MILANESAS DE POLLO', 7800, 22, 13);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('CANELONES verdura pollo y salsa fileto', 7300, 23, 13);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('CREPPES VERDURA Y muzza salsa 4 quesos', 7900, 23, 13);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('LASAGNA A LA BOLOGNESA CON SALSA FILETO', 8800, 23, 13);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('SALSA CHAMPIGNON', 5000, 24, 13);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('SALSA BOLOGNESA', 5200, 24, 13);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('SALSA FILETO', 4400, 24, 13);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('CASERITOS AL HUEVO', 4250, 25, 14);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('CASERITOS CON ESPINACA', 4250, 25, 14);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('MOSTACHOL', 3750, 25, 14);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('PENNERIGATE', 3750, 25, 14);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('FUSILLI', 3750, 25, 14);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('MUNICIONES', 4250, 25, 14);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('RAVIOLES DE RICOTA Y QUESO', 10100, 26, 14);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('RAVIOLES DE CARNE ', 10100, 26, 14);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('RAVIOLES DE ESPINACA ', 10100, 26, 14);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('RAVIOLES PIAMONTESES (ricota, jamon, muzza)', 10100, 26, 14);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('RAVIOLES DE CALABAZA(calabaza,q, cebo. verdeo)', 10100, 26, 14);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('SORRENTINOS (jym o capresse)', 13100, 26, 14);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('ÑOQUIS PAPA 600gr', 13100, 26, 14);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('ÑOQUIS ESPINACA 600gr', 13100, 26, 14);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('CANELONES DE RICOTA Y JAMON ', 11200, 26, 14);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('CANELONES DE VERDURA (masa madre)', 11200, 26, 14);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('CANELONES CARNE', 11200, 26, 14);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('LASAGNAS (Verdura, ricota, jamon, queso)', 11200, 26, 14);
INSERT INTO Articulos (Nombre, Precio_Unitario, ID_Categoria, ID_Marca) VALUES ('PIZZA NAPOLITANA A LA PIEDRA ', 16800, 26, 14);


-- Inserci�n de datos en la tabla Imagenes
INSERT INTO Imagenes (ID_Articulo, URL_Imagen) VALUES 
(18, 'assets/images/articles/cuadrado_brownie.jpeg'),
(21, 'assets/images/articles/lemonie.jpeg'),
(19, 'assets/images/articles/frola.jpeg'),
(25, 'assets/images/articles/pepas.jpeg'),
(28, 'assets/images/articles/galletitas_miel.jpeg'),
(15, 'assets/images/articles/mini_budin_chocolate.jpeg'),
(37, 'assets/images/articles/pan_integral.jpeg'),
(36, 'assets/images/articles/pan_semillas.jpeg'),
(5, 'assets/images/articles/mini_alfajor_maicena.jpeg');

-- Inserci�n de datos en la tabla TipoUsuarios
INSERT INTO TipoUsuarios (Nombre) VALUES 
('Administrador'),
('Vendedor');

-- Inserci�n de datos en la tabla Usuarios
INSERT INTO Usuarios (ID_TipoUsuario, ID_Local, Usuario, NombreCompleto, Contrasenia, CorreoElectronico) VALUES 
(1, 2, 'Matute', 'Mateo Barrios', 'admin1', 'Matute@example.com'),
(1, 1, 'admin2', 'Administrador Dos', 'adminpass2', 'admin2@example.com'),
(2, 3, 'ventas1', 'Vendedor Uno', 'ventaspas1', 'ventas1@example.com'),
(2, 4, 'ventas2', 'Vendedor Dos', 'ventaspas2', 'ventas2@example.com'),
(2, 2, 'ventas3', 'Vendedor Tres', 'ventaspas3', 'ventas3@example.com');

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

INSERT INTO DetallesVentas (ID_Venta, ID_Articulo, Cantidad, Precio_Unitario, Precio_Venta) VALUES 
(4, 1, 1, 4990.00, 4800),
(3, 2, 1, 4990.00, 4800),
(3, 3, 1, 4990.00, 4800),
(4, 4, 1, 4990.00, 4800),
(5, 5, 1, 6350.00, 4800),
(6, 6, 1, 3990.00, 4800),
(7, 7, 1, 4600.00, 4800),
(8, 8, 1, 4600.00, 4800),
(9, 9, 1, 4600.00, 4800),
(10, 8, 1, 4600.00, 4800);


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
(3, 6, 70),
(4, 1, 30),
(4, 2, 20),
(4, 3, 25),
(4, 4, 15),
(4, 5, 20),
(4, 6, 50);

-- Inserci�n de datos en la tabla Pedidos
INSERT INTO Pedidos (ID_Local, ID_TipoPedido, Fecha, Estado, Fecha_Entrega) VALUES 
(1, 1, GETDATE(), 'Pendiente', NULL),
(2, 5, GETDATE(), 'Enviado', GETDATE()),
(3, 4, GETDATE(), 'Completado', GETDATE()),
(1, 1, GETDATE(), 'Pendiente', NULL),
(2, 1, GETDATE(), 'Enviado', GETDATE()),
(4, 1, GETDATE(), 'Pendiente', NULL),
(4, 2, GETDATE(), 'Enviado', GETDATE()),
(3, 3, GETDATE(), 'Completado', GETDATE()),
(1, 2, GETDATE(), 'Pendiente', NULL),
(2, 1, GETDATE(), 'Enviado', GETDATE());

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


INSERT INTO TurnoCaja (ID_Usuario, ID_Local, FechaApertura, MontoApertura, FechaCierre, MontoCierre, MontoRetiro, Abierta) VALUES 
(1, 1, DATEADD(DAY, -20, GETDATE()), 10000.00, DATEADD(DAY, -20, GETDATE()), 18000.00, 2000.00, 0),
(2, 2, DATEADD(DAY, -19, GETDATE()), 8000.00, DATEADD(DAY, -19, GETDATE()), 14000.00, 1500.00, 0),
(3, 1, DATEADD(DAY, -18, GETDATE()), 9000.00, DATEADD(DAY, -18, GETDATE()), 12000.00, 1800.00, 0),
(4, 3, DATEADD(DAY, -17, GETDATE()), 11000.00, DATEADD(DAY, -17, GETDATE()), 17000.00, 2200.00, 0),
(5, 2, DATEADD(DAY, -16, GETDATE()), 9500.00, DATEADD(DAY, -16, GETDATE()), 16000.00, 1000.00, 0),
(1, 1, DATEADD(DAY, -15, GETDATE()), 10000.00, DATEADD(DAY, -15, GETDATE()), 15000.00, 500.00, 0),
(2, 2, DATEADD(DAY, -14, GETDATE()), 8500.00, DATEADD(DAY, -14, GETDATE()), 14500.00, 1000.00, 0),
(3, 3, DATEADD(DAY, -13, GETDATE()), 9700.00, DATEADD(DAY, -13, GETDATE()), 17500.00, 1300.00, 0),
(4, 1, DATEADD(DAY, -12, GETDATE()), 9300.00, DATEADD(DAY, -12, GETDATE()), 15300.00, 800.00, 0),
(5, 2, DATEADD(DAY, -11, GETDATE()), 10100.00, DATEADD(DAY, -11, GETDATE()), 16000.00, 1200.00, 0),
(1, 3, DATEADD(DAY, -10, GETDATE()), 9900.00, NULL, NULL, NULL, 1),
(2, 1, DATEADD(DAY, -9, GETDATE()), 10500.00, NULL, NULL, NULL, 1),
(3, 2, DATEADD(DAY, -8, GETDATE()), 8700.00, NULL, NULL, NULL, 1),
(4, 3, DATEADD(DAY, -7, GETDATE()), 9200.00, NULL, NULL, NULL, 1),
(5, 1, DATEADD(DAY, -6, GETDATE()), 9400.00, NULL, NULL, NULL, 1),
(1, 2, DATEADD(DAY, -5, GETDATE()), 9800.00, NULL, NULL, NULL, 1),
(2, 3, DATEADD(DAY, -4, GETDATE()), 10200.00, NULL, NULL, NULL, 1),
(3, 1, DATEADD(DAY, -3, GETDATE()), 8900.00, NULL, NULL, NULL, 1),
(4, 2, DATEADD(DAY, -2, GETDATE()), 8700.00, NULL, NULL, NULL, 1),
(5, 3, DATEADD(DAY, -1, GETDATE()), 9700.00, NULL, NULL, NULL, 1);

-- no se porque estaba esto aca
-- ALTER TABLE MediosDePago ADD ActivoMedioDePago BIT NOT NULL DEFAULT 1;