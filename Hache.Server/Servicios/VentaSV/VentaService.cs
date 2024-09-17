using Hache.Server.DAO;
using Hache.Server.Entities;
using System.Data;

namespace Hache.Server.Servicios.VentaSV
{
    public class VentaService : IVentaService
    {
        private readonly DaoVentas _DaoVentas;

        public VentaService(AccesoDB accesoDB)
        {

            _DaoVentas = new DaoVentas(accesoDB);
        }

        public List<Venta> ObtenerTodasLasVentas()
        {
            DataTable tablaVentas = _DaoVentas.tablaVentas();
            List<Venta> venta = new List<Venta>();

            foreach (DataRow row in tablaVentas.Rows)
            {
                Venta ventaNueva = new Venta()
                {
                    ID_Venta = (int)row["ID_Venta"],

                    Fecha = (DateTime)row["Fecha"],

                    //Usuario = (Usuario)row["Usuario"],

                    Subtotal = row["Subtotal"] != DBNull.Value
                         ? Convert.ToDecimal(row["Subtotal"])
                         : 0m,

                    Total = row["Total"] != DBNull.Value
                         ? Convert.ToDecimal(row["Total"])
                         : 0m,

                    EsPedidosYa = (bool)row["EsPedidosYa"],

                    //Local = (Local)row["Local"],



                };

                venta.Add(ventaNueva);
            }
            return venta;

        }
    }
}
