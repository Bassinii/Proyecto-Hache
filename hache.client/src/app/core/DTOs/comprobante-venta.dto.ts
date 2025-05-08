export interface ComprobanteVentaDto {
  circuitoContable: {
    nombre: string;
    codigo: string;
  };
  comprobante: number;
  comprobanteAsociado: number;
  fechaDesde: string;
  fechaHasta: string;
  tienePeriodoServicio: boolean;
  fechaFacturacionServicioDesde: string;
  fechaFacturacionServicioHasta: string;
  CAE: string;
  transaccionid: number;
  cliente: {
    ID: number;
    nombre: string;
    codigo: string;
  };
  tipo: number;
  nombre: string;
  fecha: string;
  puntoVenta: {
    ID: number;
    nombre: string;
    codigo: string;
  };
  condicionDePago: number;
  deposito: {
    ID: number;
    nombre: string;
    codigo: string;
  };
  primerTktA: string;
  ultimoTktA: string;
  primerTktBC: string;
  ultimoTktBC: string;
  cantComprobantesEmitidos: number;
  cantComprobantesCancelados: number;
  cotizacion: number;
  moneda: {
    ID: number;
    nombre: string;
    codigo: string;
  };
  importeMonPrincipal: number;
  importetotal: number;
  importeImpuestos: number;
  importeGravado: number;
  origenId: number;
  provincia: {
    provincia_id: number;
    codigo: string;
    nombre: string;
    pais: string;
  };
  cotizacionListaDePrecio: number;
  mailEstado: string;
  descripcion: string;
  cbuinformada: boolean;
  facturaNoExportacion: boolean;
  transaccionProductoItems: TransaccionProductoItem[];
  transaccionPercepcionItems: TransaccionPercepcionItem[];
  transaccionCobranzaItems: TransaccionCobranzaItem[];
}

export interface TransaccionProductoItem {
  transaccionCVItemId: number;
  precioconivaincluido: number;
  transaccionId: number;
  producto: {
    ID: number;
    nombre: string;
    codigo: string;
  };
  deposito: {
    ID: number;
    nombre: string;
    codigo: string;
  };
  descripcion: string;
  cantidad: number;
  precio: number;
  iva: number;
  importe: number;
  total: number;
  montoExento: number;
  porcentajeDescuento: number;
}

export interface TransaccionPercepcionItem {
  transaccionCVItemId: number;
  percepcionImpuesto: {
    ID: number;
    nombre: string;
    codigo: string;
  };
  transaccionId: number;
  descripcion: string;
  importe: number;
}

export interface TransaccionCobranzaItem {
  transaccionid: number;
  itemId: number;
  cuentaTipo: string;
  cuentaId: number;
  moneda: {
    ID: number;
    nombre: string;
    codigo: string;
  };
  cotizacionMonTransaccion: number;
  importeMonPrincipal: number;
  importeMonTransaccion: number;
  numeroCheque: string;
  fechaVto: string;
  banco: {
    ID: number;
    nombre: string;
    codigo: string;
  };
  descripcion: string;
  transaccionId: number;
}
