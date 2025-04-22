using Hache.Server.DAO;
using Hache.Server.Entities;
using Hache.Server.Utilities;
using System.Data;

namespace Hache.Server.Servicios.VentaSV
{
    public class VentaService : IVentaService
    {
        private readonly DaoVentas _DaoVentas;
        private readonly DaoDetalleVenta _DaoDetalleVenta;
        private readonly DaoUsuarios _DaoUsuarios;
        private readonly DaoLocales _DaoLocales;
        private readonly DaoArticulos _DaoArticulos;

        public VentaService(AccesoDB accesoDB)
        {

            _DaoVentas = new DaoVentas(accesoDB);
            _DaoDetalleVenta = new DaoDetalleVenta(accesoDB);   
            _DaoUsuarios = new DaoUsuarios(accesoDB);  
            _DaoLocales = new DaoLocales(accesoDB);
            _DaoArticulos = new DaoArticulos(accesoDB);
        }

        public List<Venta> ObtenerTodasLasVentas()
        {
            DataTable tablaVentas = _DaoVentas.TablaVentas();

            if (tablaVentas == null || tablaVentas.Rows.Count == 0)
            {
                throw new Exception("No hay ventas disponibles en la base de datos.");
            }
            List<Venta> venta = new List<Venta>();

            foreach (DataRow row in tablaVentas.Rows)
            {
                int idVenta = (int)row["ID_Venta"];

                Venta ventaNueva = new Venta()
                {
                    ID_Venta = idVenta,

                    Fecha = (DateTime)row["Fecha"],

                    ID_Usuario = (int)row["ID_Usuario"],


                    ID_Local = (int)row["ID_Local"],

                    Subtotal = row["Subtotal"] != DBNull.Value
                         ? Convert.ToDecimal(row["Subtotal"])
                         : 0m,

                    Total = row["Total"] != DBNull.Value
                         ? Convert.ToDecimal(row["Total"])
                         : 0m,

                    EsPedidosYa = (bool)row["EsPedidosYa"],


                    DetalleVenta = _DaoDetalleVenta.ObtenerDetalleVentaPorIdVentaLista(idVenta),

                    ID_MedioDePago = (int)row["ID_MedioDePago"],

                };

                venta.Add(ventaNueva);
            }
            return venta;

        }

        public Venta ObtenerVentaPorIdVenta(int idVenta)
        {
            DataTable tablaVentas = _DaoVentas.ObtenerVentaPorId(idVenta);
            Venta venta = new Venta();
            if (tablaVentas.Rows.Count > 0)
            {
                foreach (DataRow row in tablaVentas.Rows)
                {
                    Venta ventaNueva = new Venta
                    {
                        ID_Venta = idVenta,

                        Fecha = (DateTime)row["Fecha"],

                        ID_Usuario = (int)row["ID_Usuario"],


                        ID_Local = (int)row["ID_Local"],

                        ID_MedioDePago = (int)row["ID_MedioDePago"],

                        Subtotal = row["Subtotal"] != DBNull.Value
                         ? Convert.ToDecimal(row["Subtotal"])
                         : 0m,

                        Total = row["Total"] != DBNull.Value
                         ? Convert.ToDecimal(row["Total"])
                         : 0m,

                        EsPedidosYa = (bool)row["EsPedidosYa"],


                        DetalleVenta = _DaoDetalleVenta.ObtenerDetalleVentaPorIdVentaLista(idVenta),
                    };
                    venta= ventaNueva;
                }
            }
            return venta;
        }

        public List<Venta> ObtenerVentaPorFecha(DateTime fechaVenta)
        {
            DataTable tablaVentas = _DaoVentas.ObtenerVentaPorFecha(fechaVenta);
            List<Venta> venta = new List<Venta>();
            if (tablaVentas.Rows.Count > 0)
            {
                foreach (DataRow row in tablaVentas.Rows)
                {
                    int idVenta = (int)row["ID_Venta"];

                    Venta ventaNueva = new Venta
                    {
                        ID_Venta = idVenta,

                        Fecha = (DateTime)row["Fecha"],

                        ID_Usuario = (int)row["ID_Usuario"],

                        ID_MedioDePago = (int)row["ID_MedioDePago"],

                        ID_Local = (int)row["ID_Local"],

                        Subtotal = row["Subtotal"] != DBNull.Value
                         ? Convert.ToDecimal(row["Subtotal"])
                         : 0m,

                        Total = row["Total"] != DBNull.Value
                         ? Convert.ToDecimal(row["Total"])
                         : 0m,

                        EsPedidosYa = (bool)row["EsPedidosYa"],


                        DetalleVenta = _DaoDetalleVenta.ObtenerDetalleVentaPorIdVentaLista(idVenta),
                    };

                    venta.Add(ventaNueva);
                }
            }
            return venta;

        }

        public List<Venta> ObtenerVentaPorMP(int idMedioPago)
        {
            DataTable tablaVentas = _DaoVentas.ObtenerVentaPorMP(idMedioPago);
            List<Venta> venta = new List<Venta>();
            if (tablaVentas.Rows.Count > 0)
            {
                foreach (DataRow row in tablaVentas.Rows)
                {
                    int idVenta = (int)row["ID_Venta"];

                    Venta ventaNueva = new Venta
                    {
                        ID_Venta = idVenta,

                        Fecha = (DateTime)row["Fecha"],

                        ID_Usuario = (int)row["ID_Usuario"],

                        ID_MedioDePago = (int)row["ID_MedioDePago"],

                        ID_Local = (int)row["ID_Local"],

                        Subtotal = row["Subtotal"] != DBNull.Value
                         ? Convert.ToDecimal(row["Subtotal"])
                         : 0m,

                        Total = row["Total"] != DBNull.Value
                         ? Convert.ToDecimal(row["Total"])
                         : 0m,

                        EsPedidosYa = (bool)row["EsPedidosYa"],


                        DetalleVenta = _DaoDetalleVenta.ObtenerDetalleVentaPorIdVentaLista(idVenta),
                    };

                    venta.Add(ventaNueva);
                }
            }
            return venta;

        }

        public List<Venta> ObtenerVentaPorLocal(int idLocal)
        {
            DataTable tablaVentas = _DaoVentas.ObtenerVentaPorLocal(idLocal);
            List<Venta> venta = new List<Venta>();
            if (tablaVentas.Rows.Count > 0)
            {
                foreach (DataRow row in tablaVentas.Rows)
                {
                    int idVenta = (int)row["ID_Venta"];

                    Venta ventaNueva = new Venta
                    {
                        ID_Venta = idVenta,

                        Fecha = (DateTime)row["Fecha"],

                        ID_Usuario = (int)row["ID_Usuario"],

                        ID_MedioDePago = (int)row["ID_MedioDePago"],

                        ID_Local = (int)row["ID_Local"],

                        Subtotal = row["Subtotal"] != DBNull.Value
                         ? Convert.ToDecimal(row["Subtotal"])
                         : 0m,

                        Total = row["Total"] != DBNull.Value
                         ? Convert.ToDecimal(row["Total"])
                         : 0m,

                        EsPedidosYa = (bool)row["EsPedidosYa"],


                        DetalleVenta = _DaoDetalleVenta.ObtenerDetalleVentaPorIdVentaLista(idVenta),
                    };

                    venta.Add(ventaNueva);
                }
            }
            return venta;

        }

        private Local ObtenerLocalPorId(int IdLocal)
        {
            DataTable tablaLocal = _DaoLocales.ObtenerLocalPorId(IdLocal);
            DataRow row = tablaLocal.Rows[0];

            return new Local
            {
                ID_Local = (int)row["ID_Local"],
                Nombre = row["Nombre"]?.ToString() ?? string.Empty
            };

        }

        //EN DESUSO POR CAMBIO DE OBJETO A ID DE USUARIO EN VENTA
        private Usuario ObtenerUsuarioPorId(int idUsuario)
        {
            DataTable TablaUsuario = _DaoUsuarios.ObtenerUsuarioPorId(idUsuario);
            DataRow row = TablaUsuario.Rows[0];

            return new Usuario
            {
                ID_Usuario = (int)row["ID_Usuario"],

                //NombreUsuario = row["Usuario"]?.ToString(),
              //  NombreCompleto = row["NombreCompleto"]?.ToString() ?? string.Empty,
               // CorreoElectronico = row["CorreoElectronico"]?.ToString() ?? string.Empty,
                //ID_Local = (int)row["Id_Local"],

            };
        }

        public Venta CargarVenta(Venta nuevaVenta)
        {
            try
            {
                // Llamamos al método AgregarVentaConDetalles de DaoVentas, pasando la venta y sus detalles.
                _DaoVentas.AgregarVentaConDetalles(nuevaVenta, nuevaVenta.DetalleVenta);

                return nuevaVenta; // Retornamos la venta cargada
            }
            catch (Exception ex)
            {
                // En caso de un error, puedes capturar la excepción y tomar las medidas adecuadas
                Console.WriteLine("Error al cargar la venta: " + ex.Message);
                throw;
            }
        }

        public void BajaVenta(int idVenta)
        {
            _DaoVentas.BajaVenta(idVenta);
        }
    }
}
