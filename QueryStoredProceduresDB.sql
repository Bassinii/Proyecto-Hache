CREATE PROCEDURE AgregarOActualizarStock
    @ID_Articulo INT,
    @ID_Local INT,
    @Cantidad INT
AS
BEGIN
    MERGE INTO Stocks AS target
    USING (SELECT @ID_Articulo AS ID_Articulo, @ID_Local AS ID_Local, @Cantidad AS Cantidad) AS source
    ON target.ID_Articulo = source.ID_Articulo AND target.ID_Local = source.ID_Local
    WHEN MATCHED THEN
        UPDATE SET target.Cantidad = target.Cantidad + source.Cantidad
    WHEN NOT MATCHED THEN
        INSERT (ID_Articulo, ID_Local, Cantidad)
        VALUES (source.ID_Articulo, source.ID_Local, source.Cantidad);
END

GO

CREATE PROCEDURE CambiarPrecioArticulo
    @ID_Articulo INT,
    @Precio_Nuevo DECIMAL(10, 2)
AS
BEGIN
    DECLARE @Precio_Anterior DECIMAL(10, 2);

    -- Obtiene el precio actual del artículo
    SELECT @Precio_Anterior = Precio_Unitario FROM Articulos WHERE ID_Articulo = @ID_Articulo;

    -- Actualiza el precio del artículo
    UPDATE Articulos
    SET Precio_Unitario = @Precio_Nuevo
    WHERE ID_Articulo = @ID_Articulo;

    -- Insert del cambio de precio en el historial de precios
    INSERT INTO HistorialPrecios (ID_Articulo, Precio_Anterior, Precio_Nuevo)
    VALUES (@ID_Articulo, @Precio_Anterior, @Precio_Nuevo);
END;

GO


CREATE PROCEDURE sp_EditarPedido
    @ID_Pedido INT,
    @Estado NVARCHAR(50),
    @Fecha_Entrega DATETIME = NULL
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Pedidos
    SET Estado = @Estado,
        Fecha_Entrega = CASE 
                            WHEN @Fecha_Entrega IS NOT NULL THEN @Fecha_Entrega 
                            ELSE Fecha_Entrega 
                        END
    WHERE ID_Pedido = @ID_Pedido;
END



CREATE TYPE DetallePedidoTipo AS TABLE(
	[ID_DetallePedido] [int] NULL,
	[ID_Pedido] [int] NULL,
	[ID_Articulo] [int] NULL,
	[Cantidad] [int] NULL,
	[Precio_Unitario] [decimal](18, 2) NULL
)
GO

CREATE PROCEDURE EditarDetallesPedido
    @ID_Pedido INT,
    @NuevosDetalles DetallePedidoTipo READONLY
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM DetallesPedidos
    WHERE ID_Pedido = @ID_Pedido
      AND ID_DetallePedido NOT IN (
          SELECT ID_DetallePedido
          FROM @NuevosDetalles
          WHERE ID_DetallePedido > 0
      );

    UPDATE dp
    SET 
        dp.ID_Articulo = nd.ID_Articulo,
        dp.Cantidad = nd.Cantidad,
        dp.Precio_Unitario = nd.Precio_Unitario
    FROM DetallesPedidos dp
    INNER JOIN @NuevosDetalles nd ON dp.ID_DetallePedido = nd.ID_DetallePedido
    WHERE nd.ID_DetallePedido > 0;

    INSERT INTO DetallesPedidos (ID_Pedido, ID_Articulo, Cantidad, Precio_Unitario)
    SELECT ID_Pedido, ID_Articulo, Cantidad, Precio_Unitario
    FROM @NuevosDetalles
    WHERE ID_DetallePedido = 0;
END;