import { Component, computed, EventEmitter, Output, signal } from '@angular/core';
import { ArticuloCarrito } from '../../../core/models/articulo-carrito';
import { MedioDePago } from '../../../core/models/medio-de-pago';
import { CarritoServiceService } from '../../../core/services/carrito-service.service';
import { MedioDePagoService } from '../../../core/services/medio-de-pago.service';
import { VentasService } from '../../../core/services/ventas.service';
import { VentaDTO } from '../../../core/DTOs/venta.dto';
import { DetalleVentaDTO } from '../../../core/DTOs/detalle-venta.dto';
import Swal from 'sweetalert2';
import { StockServiceService } from '../../../core/services/stock-service.service';
import { ComprobanteVentaDto, TransaccionProductoItem } from '../../../core/DTOs/comprobante-venta.dto';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  @Output() cerrarModal = new EventEmitter<void>(); // Notifica cuando se cierra el modal

  mostrarModal = true;

  mediosDePago: MedioDePago[] = []; //Se cargan de la DB los medios de pago existenes
  medioDePago: MedioDePago | null = null;   //Se asigna el medio de pago de la venta, tiene por defecto null

  pedidoYa = signal(false); //true o false si la venta se realiza en PedidosYa
  xubio = signal(true); //true o false si se crea un comprobante de venta en Xubio

  metodoSeleccionado: string = '';
  subtotal = computed(() => {
    const carrito = this.carrito();
    let subtotalCalculado = 0;

    carrito.forEach(item => {
      const precio = this.pedidoYa() ? ((item.articulo.precio * item.cantidad) - item.montoDescuento) / 0.82 : ((item.articulo.precio * item.cantidad) - item.montoDescuento);
      subtotalCalculado += precio;
    });

    return subtotalCalculado;
  });



  tipoDescuento: string = 'porcentaje';
  totalConDescuento = computed(() => this.subtotal() - this.montoDescuento());
  numeroDescuento: number = 0; //puede ser un numero porcentual o un monto fijo, es el numero que viene del input del HTML.
  montoDescuento = signal(0); //este numero debe calcular siempre el subtotal - el descuento


  //Datos que se obtienen del localStorage y token para completar los datos de la venta 
  idLocal: number = 0;
  idTipoUsuario: number = 0;
  nombreUsuario: string = '';
  nombreCompleto: string = '';

  constructor(
    private carritoService: CarritoServiceService,
    private ventaService: VentasService,
    private medioDePagoService: MedioDePagoService,
    private stockService: StockServiceService
  ) { }

  ngOnInit() {
    this.cargarDatosUsuario();
    this.cargarMediosDePago();
  }

  ngDoCheck() {
    this.aplicarDescuento();
    console.log('DoCheck');
  }

  get pedidoYaModel() {
    return this.pedidoYa();
  }

  set pedidoYaModel(valor: boolean) {
    this.pedidoYa.set(valor);
  }
  set xubioModel(valor: boolean) {
    this.xubio.set(valor);
  }

  actualizarData() {
    //ESTE METODO SE EJECUTA AL ELIMINAR UN ARTICULO DEL CARRITO QUE ESTÁ DENTRO DEL MODAL (Emitido desde modal-carrito-item.ts)
    //Como la data necesaria se actualiza con el DoCheck no uso este metodo, pero capaz sea lo mejor en el futuro.
  }

  //ASIGNA EN ARRAY DE MEDIOS DE PAGO LOS MEDIOS DE PAGO QUE NOS TRAE EL BACK Y LA DB
  cargarMediosDePago(): void {
    this.medioDePagoService.obtenerMediosDePago().subscribe(
      (data) => {
        this.mediosDePago = data;


      },
      (error) => {
        console.error('Error al cargar los métodos de pago', error);
      }
    );
  }

  //ASIGNA EN VARIABLES LOS DATOS DEL LOCAL STORAGE DEL USUARIO
  cargarDatosUsuario() {

    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token no encontrado.');
      return;
    }
    try { 
      const decodedToken: any = jwtDecode(token);
      this.idLocal = Number(decodedToken['ID_Local']);
      this.idTipoUsuario = Number(decodedToken['userRole'])
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return
    }

    this.nombreCompleto = localStorage.getItem('nombreCompleto') || 'Usuario Desconocido';
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || 'Sin usuario';
    this.idLocal = Number(localStorage.getItem('idLocal')) || 1; //Está mal
    this.idTipoUsuario = Number(localStorage.getItem('userRole')) || 0; //Está mal
  }

  //retorna array de tipo ArticuloCarrito con los articulos seleccionados
  carrito = computed(() => this.carritoService.carrito());


  //retorna un numero con el subtotal del carrito
  get totalCarrito() {
    return this.carritoService.getTotal();
  }

  cerrar() {
    this.cerrarModal.emit();
  }

  guardarVenta(): void {
    const carrito: ArticuloCarrito[] = this.carritoService.getCarrito();
    let comprobante;

    if (!carrito || carrito.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Datos incompletos',
        text: 'No se puede guardar una venta sin productos',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    if (!this.medioDePago) {
      Swal.fire({
        icon: 'warning',
        title: 'Medio de pago no seleccionado',
        text: 'Por favor, seleccioná un medio de pago antes de continuar.',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    const montoDescuento = 0; //AL AGREGAR LÓGICA DE DESCUENTO A ARTÍCULO CAMBIAR ESTE VALOR

    const detalleVentaDTO: DetalleVentaDTO[] = Array.isArray(carrito) ? carrito.map(item => ({
      iD_Articulo: item.articulo?.id ?? 0, // Asegura que el id sea válido
      codigoXubio: item.articulo.codigoXubio ? item.articulo.codigoXubio : 'PRODUCTO_SIN_GLUTEN', // SE ASIGNA CODIGO DE XUBIO
      cantidad: item.cantidad ?? 1, // Evita valores nulos
      precio_Unitario: item.articulo?.precio ?? 0, // Asegura que el precio sea válido
      precio_Venta: ((item.articulo?.precio ?? 0) - (item.montoDescuento ? item.montoDescuento / item.cantidad : 0)) / (this.pedidoYa() ? 0.82 : 1) //Precio de Venta, Precio del artículo - Monto de descuento + cargo PedidosYa
    })) : [];

    const ventaDTO: VentaDTO = {
      iD_Usuario: Number(localStorage.getItem('idUsuario')) || 1,
      fecha: new Date(),
      subtotal: this.subtotal(),
      total: this.totalConDescuento(),
      iD_MedioDePago: this.medioDePago ? this.medioDePago.id : 0,
      esPedidosYa: this.pedidoYa(),
      iD_Local: this.idLocal,
      detalleVenta: detalleVentaDTO,
      transaccionIdXubio: 0,
    };

    try {
      comprobante = this.generarComprobanteDeVenta(ventaDTO);
      if (!comprobante) {
        console.log(comprobante);
      }
      ventaDTO.transaccionIdXubio = comprobante?.transaccionid;
    } catch (error) {
      console.error("Error capturado:", error);
    }

    this.ventaService.agregarVenta(ventaDTO).subscribe({
      next: (respuesta) => {
        this.cerrar();
        this.carritoService.vaciarCarrito();
        this.stockService.emitirActualizacionArticulos();
        console.log('responde del agregar venta service: ', respuesta);
        

        Swal.fire({
          title: 'Venta guardada',
          text: 'La venta se ha realizado correctamente.',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        });
      },
      error: (error) => {
        console.error('Error al enviar la venta', error);

        const mensaje = typeof error?.error === 'string'
          ? error.error
          : 'Hubo un error al cargar la venta. Intentalo de nuevo.';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: mensaje,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    });
    console.log('Venta cargada: ', ventaDTO);
  }

  //ARREGLAR
  aplicarDescuento(): void {
    if (this.tipoDescuento === "porcentaje") {
      this.montoDescuento.set(this.subtotal() * this.numeroDescuento / 100);
    } else {
      this.montoDescuento.set(this.numeroDescuento);
    }
  }

  validarDescuento(event: any): void {
    let valor = Number(event.target.value);

    if (this.tipoDescuento === "porcentaje") {
      if (valor > 100) {
        valor = 100;
      }
    } else {
      if (valor > this.subtotal()) {
        valor = Number(this.subtotal().toFixed(2));
      }
    }
    event.target.value = valor;
    this.numeroDescuento = valor; // Asegurar que el valor se actualiza en la variable
  }

  validarTipoDescuento(event: any): void {
    if (this.tipoDescuento === "porcentaje" && this.numeroDescuento > 100) {
      this.numeroDescuento = 100; // Ajusta al máximo permitido
    } else if (this.tipoDescuento === "monto" && this.numeroDescuento > this.subtotal()) {
      this.numeroDescuento = Number(this.subtotal().toFixed(2)); // Ajusta al subtotal
    }
  }

  actualizarMedioDePago() {
    const medioSeleccionado = this.mediosDePago.find(m => m.id === this.medioDePago?.id);
    if (medioSeleccionado) {
      this.medioDePago = medioSeleccionado;
    }
  }

  generarComprobanteDeVenta(venta: VentaDTO): ComprobanteVentaDto | null {
    let codigoLocal: string = '';
    let idCuenta: number = 0;
    let codigoDeposito: string = '';
    let cuentaTipo: string = '';
    let comprobanteGenerado: ComprobanteVentaDto | null = null;

    //LOS SWITCH ESTÁN MAL XQ NO CONTEMPLA QUE SE AGREGUEN LOCALES
    switch (this.idLocal) {
      case 1://ES EL ID EN LA DB DEL LOCAL TORCUATO
        codigoLocal = 'TORCUATO_6';
        codigoDeposito = 'TORCUATO';
        break;
      case 2://ES EL ID EN LA DB DEL LOCAL ACASSUSO
        codigoLocal = 'ACASSUSO_6';
        codigoDeposito = 'ACASSUSO';
        break;
      case 3://ES EL ID EN LA DB DEL LOCAL VICENTE LOPEZ
        codigoLocal = 'VTE_LOPEZ_6';
        codigoDeposito = 'VTE_LOPEZ';
        break;
      case 4://ES EL ID EN LA DB DEL LOCAL LOMAS
        codigoLocal = 'LOMAS_6';
        codigoDeposito = 'LOMAS';
        break;
    }

    switch (venta.iD_MedioDePago) {
      case 1: //EFECTIVO EN LA DB
        idCuenta = -13; //EL ID DE CAJA EN XUBIO
        cuentaTipo = 'CAJA';
        break;
      case 2: //DÉBITO EN LA DB
        idCuenta = -14; //EL ID DE BANCO EN XUBIO
        cuentaTipo = 'BANCO';
        break;
      case 3: //CRÉDITO EN LA DB
        idCuenta = -14; //EL ID DE BANCO EN XUBIO
        cuentaTipo = 'BANCO';
        break;
      case 4: //EL ID DE BANCO EN XUBIO
        idCuenta = -14; //EL ID DE BANCO EN XUBIO
        cuentaTipo = 'BANCO';
        break;
    }

    const transaccionProductoItems: TransaccionProductoItem[] = Array.isArray(venta.detalleVenta)
      ? venta.detalleVenta.map(item => ({
        transaccionCVItemId: 0,
        precioconivaincluido: Number(item.precio_Unitario),
        transaccionId: 0,
        producto: {
          ID: 0,
          nombre: '',
          codigo: item.codigoXubio ? item.codigoXubio : 'PRODUCTO_SIN_GLUTEN'
        },
        deposito: {
          ID: 0,
          nombre: '',
          codigo: codigoDeposito || 'DEPOSITO_UNIVERSAL'       // usa el código real si lo tenés
        },
        descripcion: '',             // usa la descripción real si lo tenés
        cantidad: Number(item.cantidad),
        precio: Number(item.precio_Unitario),
        iva: 0,
        importe: 0,                                             // según tu ejemplo, va en 0
        total: Number(item.cantidad) * Number(item.precio_Unitario),
        montoExento: 0,
        porcentajeDescuento: Number((item.precio_Unitario - item.precio_Venta) * 100 / item.precio_Unitario)
      }))
      : [];

    if (this.montoDescuento() != 0) {
      const transaccionProductoItem: TransaccionProductoItem = {
        transaccionCVItemId: 0,
        precioconivaincluido: -this.montoDescuento(),
        transaccionId: 0,
        producto: {
          ID: 0,
          nombre: '',
          codigo: 'DESCUENTO'
        },
        deposito: {
          ID: 0,
          nombre: '',
          codigo: codigoDeposito || 'DEPOSITO_UNIVERSAL'       // usa el código real si lo tenés
        },
        descripcion: '',             // usa la descripción real si lo tenés
        cantidad: 1,
        precio: -this.montoDescuento(),
        iva: 0,
        importe: 0,                                             // según tu ejemplo, va en 0
        total: -this.montoDescuento(),
        montoExento: 0,
        porcentajeDescuento: 0 
      }
      transaccionProductoItems.push(transaccionProductoItem);
    }


    const comprobanteVenta: ComprobanteVentaDto = {
      circuitoContable: {
        nombre: '',
        codigo: 'DEFAULT'
      },
      comprobante: 0,
      comprobanteAsociado: 0,
      fechaDesde: '',
      fechaHasta: '',
      tienePeriodoServicio: false,
      fechaFacturacionServicioDesde: '',
      fechaFacturacionServicioHasta: '',
      CAE: '',
      transaccionid: 0,
      cliente: {
        ID: 7855631,
        nombre: '',
        codigo: 'CONSUMIDOR_FINAL'
      },
      tipo: 1,
      nombre: '',
      fecha: new Date().toISOString().split('T')[0],
      puntoVenta: {
        ID: 0,
        nombre: '',
        codigo: codigoLocal,
      },
      condicionDePago: 2,
      deposito: {
        ID: 0,
        nombre: '',
        codigo: codigoDeposito
      },
      primerTktA: '',
      ultimoTktA: '',
      primerTktBC: '',
      ultimoTktBC: '',
      cantComprobantesEmitidos: 0,
      cantComprobantesCancelados: 0,
      cotizacion: 1,
      moneda: {
        ID: 0,
        nombre: '',
        codigo: 'PESOS_ARGENTINOS'
      },
      importeMonPrincipal: 0,
      importetotal: 0,
      importeImpuestos: 0,
      importeGravado: 0,
      origenId: 0,
      provincia: {
        provincia_id: 0,
        codigo: 'BUENOS_AIRES',
        nombre: '',
        pais: ''
      },
      cotizacionListaDePrecio: 0,
      mailEstado: '',
      descripcion: 'Observaciones',
      cbuinformada: false,
      facturaNoExportacion: false,
      transaccionProductoItems: transaccionProductoItems,
      transaccionPercepcionItems: [],
      transaccionCobranzaItems: [
        {
          transaccionid: 0,
          itemId: 0,
          cuentaTipo: cuentaTipo,
          cuentaId: idCuenta,
          moneda: {
            ID: 0,
            nombre: '',
            codigo: 'PESOS_ARGENTINOS'
          },
          cotizacionMonTransaccion: 1,
          importeMonPrincipal: 0,
          importeMonTransaccion:  venta.total,
          numeroCheque: '',
          fechaVto: '',
          banco: {
            ID: 0,
            nombre: '',
            codigo: 'AMEX'
          },
          descripcion: '',
          transaccionId: 0
        }
      ]
    };
    console.log('EL COMPROBANTE: ', comprobanteVenta);
    this.ventaService.subirComprobante(comprobanteVenta).subscribe({
      next: (respuesta) => {
        console.log('Se subió el comprobante: ', respuesta);
        comprobanteGenerado = respuesta;
      },
      error: (error) => {
        throw new Error("No se pudo cargar el comprobante: ", error);
      }
    }
    )
    if (comprobanteGenerado == null) {
      throw new Error("No se pudo cargar el comprobante");
    }
    console.log('Comprobante: ', comprobanteGenerado);
    return comprobanteGenerado;
  }
}
