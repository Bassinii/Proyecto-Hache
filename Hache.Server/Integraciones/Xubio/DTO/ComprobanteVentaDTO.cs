using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

public class ComprobanteVentaDTO
{
    [JsonPropertyName("circuitoContable")]
    public CircuitoContable CircuitoContable { get; set; }

    [JsonPropertyName("comprobante")]
    public int Comprobante { get; set; }

    [JsonPropertyName("comprobanteAsociado")]
    public int ComprobanteAsociado { get; set; }

    [JsonPropertyName("fechaDesde")]
    public string FechaDesde { get; set; }

    [JsonPropertyName("fechaHasta")]
    public string FechaHasta { get; set; }

    [JsonPropertyName("tienePeriodoServicio")]
    public bool TienePeriodoServicio { get; set; }

    [JsonPropertyName("fechaFacturacionServicioDesde")]
    public string FechaFacturacionServicioDesde { get; set; }

    [JsonPropertyName("fechaFacturacionServicioHasta")]
    public string FechaFacturacionServicioHasta { get; set; }

    [JsonPropertyName("CAE")]
    public string CAE { get; set; }

    [JsonPropertyName("transaccionid")]
    public int TransaccionId { get; set; }

    [JsonPropertyName("cliente")]
    public Cliente Cliente { get; set; }

    [JsonPropertyName("tipo")]
    public int Tipo { get; set; }

    [JsonPropertyName("nombre")]
    public string Nombre { get; set; }

    [JsonPropertyName("fecha")]
    public string Fecha { get; set; }

    [JsonPropertyName("puntoVenta")]
    public PuntoVenta PuntoVenta { get; set; }

    [JsonPropertyName("condicionDePago")]
    public int CondicionDePago { get; set; }

    [JsonPropertyName("deposito")]
    public Deposito Deposito { get; set; }

    [JsonPropertyName("primerTktA")]
    public string PrimerTktA { get; set; }

    [JsonPropertyName("ultimoTktA")]
    public string UltimoTktA { get; set; }

    [JsonPropertyName("primerTktBC")]
    public string PrimerTktBC { get; set; }

    [JsonPropertyName("ultimoTktBC")]
    public string UltimoTktBC { get; set; }

    [JsonPropertyName("cantComprobantesEmitidos")]
    public int CantComprobantesEmitidos { get; set; }

    [JsonPropertyName("cantComprobantesCancelados")]
    public int CantComprobantesCancelados { get; set; }

    [JsonPropertyName("cotizacion")]
    public int Cotizacion { get; set; }

    [JsonPropertyName("moneda")]
    public Moneda Moneda { get; set; }

    [JsonPropertyName("importeMonPrincipal")]
    public decimal ImporteMonPrincipal { get; set; }

    [JsonPropertyName("importetotal")]
    public decimal ImporteTotal { get; set; }

    [JsonPropertyName("importeImpuestos")]
    public decimal ImporteImpuestos { get; set; }

    [JsonPropertyName("importeGravado")]
    public decimal ImporteGravado { get; set; }

    [JsonPropertyName("origenId")]
    public int OrigenId { get; set; }

    [JsonPropertyName("provincia")]
    public Provincia Provincia { get; set; }

    [JsonPropertyName("cotizacionListaDePrecio")]
    public int CotizacionListaDePrecio { get; set; }

    [JsonPropertyName("mailEstado")]
    public string MailEstado { get; set; }

    [JsonPropertyName("descripcion")]
    public string Descripcion { get; set; }

    [JsonPropertyName("cbuinformada")]
    public bool CbuInformada { get; set; }

    [JsonPropertyName("facturaNoExportacion")]
    public bool FacturaNoExportacion { get; set; }

    [JsonPropertyName("transaccionProductoItems")]
    public List<TransaccionProductoItem> TransaccionProductoItems { get; set; }

    [JsonPropertyName("transaccionPercepcionItems")]
    public List<TransaccionPercepcionItem> TransaccionPercepcionItems { get; set; }

    [JsonPropertyName("transaccionCobranzaItems")]
    public List<TransaccionCobranzaItem> TransaccionCobranzaItems { get; set; }
}

public class CircuitoContable { [JsonPropertyName("nombre")] public string Nombre { get; set; } [JsonPropertyName("codigo")] public string Codigo { get; set; } }
public class Cliente { [JsonPropertyName("ID")] public int ID { get; set; } [JsonPropertyName("nombre")] public string Nombre { get; set; } [JsonPropertyName("codigo")] public string Codigo { get; set; } }
public class PuntoVenta { [JsonPropertyName("ID")] public int ID { get; set; } [JsonPropertyName("nombre")] public string Nombre { get; set; } [JsonPropertyName("codigo")] public string Codigo { get; set; } }
public class Deposito { [JsonPropertyName("ID")] public int ID { get; set; } [JsonPropertyName("nombre")] public string Nombre { get; set; } [JsonPropertyName("codigo")] public string Codigo { get; set; } }
public class Moneda { [JsonPropertyName("ID")] public int ID { get; set; } [JsonPropertyName("nombre")] public string Nombre { get; set; } [JsonPropertyName("codigo")] public string Codigo { get; set; } }
public class Provincia { [JsonPropertyName("provincia_id")] public int ProvinciaId { get; set; } [JsonPropertyName("codigo")] public string Codigo { get; set; } [JsonPropertyName("nombre")] public string Nombre { get; set; } [JsonPropertyName("pais")] public string Pais { get; set; } }
public class Producto { [JsonPropertyName("ID")] public int ID { get; set; } [JsonPropertyName("nombre")] public string Nombre { get; set; } [JsonPropertyName("codigo")] public string Codigo { get; set; } }
public class TransaccionProductoItem { [JsonPropertyName("transaccionCVItemId")] public int TransaccionCVItemId { get; set; } [JsonPropertyName("precioconivaincluido")] public decimal PrecioConIvaIncluido { get; set; } [JsonPropertyName("transaccionId")] public int TransaccionId { get; set; } [JsonPropertyName("producto")] public Producto Producto { get; set; } [JsonPropertyName("deposito")] public Deposito Deposito { get; set; } [JsonPropertyName("descripcion")] public string Descripcion { get; set; } [JsonPropertyName("cantidad")] public int Cantidad { get; set; } [JsonPropertyName("precio")] public decimal Precio { get; set; } [JsonPropertyName("iva")] public int Iva { get; set; } [JsonPropertyName("importe")] public decimal Importe { get; set; } [JsonPropertyName("total")] public decimal Total { get; set; } [JsonPropertyName("montoExento")] public decimal MontoExento { get; set; } [JsonPropertyName("porcentajeDescuento")] public int PorcentajeDescuento { get; set; } }
public class PercepcionImpuesto { [JsonPropertyName("ID")] public int ID { get; set; } [JsonPropertyName("nombre")] public string Nombre { get; set; } [JsonPropertyName("codigo")] public string Codigo { get; set; } }
public class TransaccionPercepcionItem { [JsonPropertyName("transaccionCVItemId")] public int TransaccionCVItemId { get; set; } [JsonPropertyName("percepcionImpuesto")] public PercepcionImpuesto PercepcionImpuesto { get; set; } [JsonPropertyName("transaccionId")] public int TransaccionId { get; set; } [JsonPropertyName("descripcion")] public string Descripcion { get; set; } [JsonPropertyName("importe")] public decimal Importe { get; set; } }
public class Banco { [JsonPropertyName("ID")] public int ID { get; set; } [JsonPropertyName("nombre")] public string Nombre { get; set; } [JsonPropertyName("codigo")] public string Codigo { get; set; } }
public class TransaccionCobranzaItem { [JsonPropertyName("transaccionid")] public int TransaccionId { get; set; } [JsonPropertyName("itemId")] public int ItemId { get; set; } [JsonPropertyName("cuentaTipo")] public string CuentaTipo { get; set; } [JsonPropertyName("cuentaId")] public int CuentaId { get; set; } [JsonPropertyName("moneda")] public Moneda Moneda { get; set; } [JsonPropertyName("cotizacionMonTransaccion")] public decimal CotizacionMonTransaccion { get; set; } [JsonPropertyName("importeMonPrincipal")] public decimal ImporteMonPrincipal { get; set; } [JsonPropertyName("importeMonTransaccion")] public decimal ImporteMonTransaccion { get; set; } [JsonPropertyName("numeroCheque")] public string NumeroCheque { get; set; } [JsonPropertyName("fechaVto")] public string FechaVto { get; set; } [JsonPropertyName("banco")] public Banco Banco { get; set; } [JsonPropertyName("descripcion")] public string Descripcion { get; set; } }
