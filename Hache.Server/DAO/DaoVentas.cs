﻿using Hache.Server.Entities;
using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Hache.Server.DAO
{
    public class DaoVentas
    {

        private readonly AccesoDB _accesoDB;

        // Inyección de dependencias de AccesoDB
        public DaoVentas(AccesoDB accesoDB)
        {
            _accesoDB = accesoDB;
        }

        public DataTable TablaVentas()
        {
            string consulta = ("SELECT ID_Venta, ID_Usuario, Fecha, Hora, Subtotal, Total, EsPedidosYa, ID_Local from Ventas WHERE ActivoVenta = 1");
            return _accesoDB.ObtenerTabla("Ventas", consulta);
        }
        public DataTable ObtenerVentaPorId(int idVenta)
        {
            // Consulta parametrizada para evitar inyecciones de SQL
            string consulta = "SELECT ID_Venta, ID_Usuario, Fecha, Hora, Subtotal, Total, EsPedidosYa, ID_Local FROM Ventas WHERE ID_Venta = @ID_venta WHERE ActivoVenta = 1 ";

            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
                new SqlParameter("@ID_Venta", SqlDbType.Int) { Value = idVenta }
            };

            // Ejecutar la consulta con el parámetro
            return _accesoDB.ObtenerTabla("Ventas", consulta, parametros);
        }

        public DataTable ObtenerVentaPorFecha(DateTime fechaVenta)
        {
            string consulta = "SELECT ID_Venta, ID_Usuario, Fecha, Hora, Subtotal, Total, EsPedidosYa, ID_Local FROM Ventas WHERE CONVERT(date, Fecha) = @Fecha WHERE ActivoVenta = 1 ";

            SqlParameter[] parametros = new SqlParameter[]
           {
                new SqlParameter("@Fecha", SqlDbType.Date) { Value = fechaVenta.Date }
           };

            return _accesoDB.ObtenerTabla("Ventas", consulta, parametros);

        }

        public void AgregarVenta(Venta venta)
        {
            SqlParameter[] parametros = new SqlParameter[]
            { 
            new SqlParameter("@ID_Usuario",  SqlDbType.Int, 50) { Value =  venta.ID_Usuario.ID_Usuario },
            new SqlParameter("@Fecha", SqlDbType.DateTime, 50) { Value = venta.Fecha },
            new SqlParameter("@Subtotal", SqlDbType.Decimal, 100) { Value = venta.Subtotal },
            new SqlParameter("@Total", SqlDbType.Decimal) { Value = venta.Total},
            new SqlParameter("@EsPedidosYa", SqlDbType.Bit) { Value = venta.EsPedidosYa},
            new SqlParameter("@ID_Local", SqlDbType.Int) { Value = venta.Local.ID_Local},
            new SqlParameter("ID_MedioDePago", SqlDbType.Int) {Value = venta.ID_MedioDePago},
             
            };

            _accesoDB.EjecutarComando("INSERT INTO Ventas (ID_Usuario, Fecha,Subtotal, Total, EsPedidosYa, ID_Local, ID_MedioDePago) "
                + "VALUES(@ID_Usuario, @Fecha, @Subtotal, @Total, @EsPedidosYa, @ID_Local, @ID_MedioDePago )", parametros);

        }

        public void BajaVenta(int idVenta)
        {
            string consulta = "UPDATE Ventas SET ActivoVenta = 0 WHERE ID_Venta = @ID_Venta";
            // Crear el parámetro SQL para filtrar por ID
            SqlParameter[] parametros = new SqlParameter[]
            {
            new SqlParameter("@ID_Venta", SqlDbType.Int) { Value = idVenta }
            };
            _accesoDB.EjecutarComando(consulta, parametros);    
            
        }
        
    }

}
