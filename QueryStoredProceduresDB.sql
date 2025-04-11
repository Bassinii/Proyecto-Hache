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
