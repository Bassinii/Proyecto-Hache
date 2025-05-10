using Microsoft.Data.SqlClient;
using Hache.Server.DAO;
using Hache.Server.Entities;
using System.Data;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System;
using System.Collections.Generic;
using Hache.Server.DTO;


namespace Hache.Server.Servicios.DetalleVentaSV
{
    public class DetalleVentaService: IDetalleVentaService
    {
        private readonly DaoDetalleVenta _daoDetalleVenta;
        private readonly DaoArticulos _daoArticulo;

        public DetalleVentaService(AccesoDB accesoDB) { 
            _daoDetalleVenta = new DaoDetalleVenta(accesoDB);
            _daoArticulo = new DaoArticulos(accesoDB);
        }

        public List<DetalleVentaDTO> ObtenerDetalleVentaPorIdVenta(int idVenta) {
        
                DataTable tablaDetalleVenta = _daoDetalleVenta.ObtenerDetalleVentaPorIdVenta(idVenta);
                List<DetalleVentaDTO> detalleVenta = new List<DetalleVentaDTO>();

            if (tablaDetalleVenta.Rows.Count > 0) { 
                
                foreach (DataRow row in tablaDetalleVenta.Rows)
                {
                    DetalleVentaDTO detalleVentaNuevo = new DetalleVentaDTO
                    {
                        Id = (int)row["ID_Detalle"],

                        IdVenta = (int)row["ID_Venta"],

                        IdArticulo = (int)row["ID_Articulo"],

                        Cantidad = (int)row["Cantidad"],

                        PrecioUnitario = row["Precio_Unitario"] != DBNull.Value
                         ? Convert.ToDecimal(row["Precio_Unitario"])
                         : 0m,
                        PrecioVenta = row["Precio_Venta"] != DBNull.Value
                         ? Convert.ToDecimal(row["Precio_Venta"])
                         : 0m,
                        NombreArticulo = _daoArticulo.ObtenerNombreArticuloPorId((int)row["ID_Articulo"])
                    };
                    
                    detalleVenta.Add(detalleVentaNuevo);

                }                     
            } 
            return detalleVenta;
        }
      
    }
}
