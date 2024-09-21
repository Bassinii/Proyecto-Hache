using Hache.Server.DAO;
using Hache.Server.Entities;
using System.Data;

namespace Hache.Server.Servicios.HistorialPreciosSV
{
    public class HistorialPrecioService : IHistorialPrecioService
    {
        private readonly DaoHistorialPrecios _DaoHistorialPrecios;
        private readonly DaoArticulos _DaoArticulos;

        public HistorialPrecioService(AccesoDB accesoDB) {
        
            _DaoHistorialPrecios = new DaoHistorialPrecios(accesoDB);
            _DaoArticulos = new DaoArticulos(accesoDB);

        }

        public List<HistorialPrecios> ObtenerTodosLosHistorialPrecios()
        {
            DataTable tabla = _DaoHistorialPrecios.tablaHistorialPrecios();
            List<HistorialPrecios> hist = new List<HistorialPrecios>();

            foreach (DataRow row in tabla.Rows)
            {
               HistorialPrecios historialNuevo = new HistorialPrecios
                {
                    ID_HistorialPrecios = (int)row["ID_HistorialPrecios"],

                   ID_Articulo = (int)row["ID_Articulo"],


                   PrecioAnterior = row["Precio_Anterior"] != DBNull.Value
                         ? Convert.ToDecimal(row["Precio_Anterior"])
                         : 0m,

                   PrecioNuevo = row["Precio_Nuevo"] != DBNull.Value
                         ? Convert.ToDecimal(row["Precio_Nuevo"])
                         : 0m,

                   DateTime = (DateTime)row["Fecha_Cambio"],
               };
                hist.Add(historialNuevo);
            }
            return hist;
        }

        public List<HistorialPrecios> ObtenerHistorialPrecioPorIdArticulo(int idArticulo)
        {
            DataTable tabla = _DaoHistorialPrecios.ObtenerHistorialPreciosPorIdArticulo(idArticulo);
            List<HistorialPrecios> hist = new List<HistorialPrecios>();

            if (tabla.Rows.Count > 0)
            {
                foreach (DataRow row in tabla.Rows)
                {
                    HistorialPrecios historialNuevo = new HistorialPrecios
                    {
                        ID_HistorialPrecios = (int)row["ID_HistorialPrecios"],

                        ID_Articulo = (int)row["ID_Articulo"],

                        PrecioAnterior = row["Precio_Anterior"] != DBNull.Value
                             ? Convert.ToDecimal(row["Precio_Anterior"])
                             : 0m,

                        PrecioNuevo = row["Precio_Nuevo"] != DBNull.Value
                             ? Convert.ToDecimal(row["Precio_Nuevo"])
                             : 0m,

                        DateTime = (DateTime)row["Fecha_Cambio"],
                    };

                    hist.Add(historialNuevo);
                }
            }

            return hist;
        }

    }
}
