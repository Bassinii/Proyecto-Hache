import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { GestionArticulosComponent } from './pages/gestion-articulos/gestion-articulos.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { CierreComponent } from './pages/cierre/cierre.component';
import { SidebarComponent } from './pages/gestion-articulos/sidebar/sidebar.component';
import { ListadoComponent } from './pages/gestion-articulos/listado/listado.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth/serviceAuth/interceptor-auth';
import { AdminUsuarioComponent } from './pages/admin/admin-usuario/admin-usuario.component';
import { SidebarVentasComponent } from './pages/ventas/sidebar-ventas/sidebar-ventas.component';
import { AdminVentaComponent } from './pages/admin/admin-venta/admin-venta.component';
import { AdminGestionComponent } from './pages/admin/admin-gestion/admin-gestion.component';
import { CargarVentaComponent } from './pages/cargar-venta/cargar-venta.component';
import { ProductosListaComponent } from './pages/cargar-venta/productos-lista/productos-lista.component';
import { CheckoutComponent } from './pages/cargar-venta/checkout/checkout.component';
import { ItemCarritoComponent } from './pages/cargar-venta/item-carrito/item-carrito.component';
import { CardProductosComponent } from './pages/cargar-venta/productos-lista/card-productos/card-productos.component';
import { CheckoutItemComponent } from './pages/cargar-venta/checkout/checkout-item/checkout-item.component';
import { ModalAplicarDescuentoComponent } from './pages/cargar-venta/item-carrito/modal-aplicar-descuento/modal-aplicar-descuento.component';
import { CapitalizePipe } from './shared/pipes/capitalize.pipe';

import { AdminConfiguracionLocalComponent } from './pages/admin/admin-configuracion-local/admin-configuracion-local.component';
import { AdminConfiguracionArticuloComponent } from './pages/admin/admin-configuracion-articulo/admin-configuracion-articulo.component';
import { AdminConfiguracionCategoriasComponent } from './pages/admin/admin-configuracion-categorias/admin-configuracion-categorias.component';
import { AdminConfiguracionMarcasComponent } from './pages/admin/admin-configuracion-marcas/admin-configuracion-marcas.component';
import { SidebarPedidosComponent } from './pages/pedidos/sidebar-pedidos/sidebar-pedidos.component';
import { PedidosRealizarComponent } from './pages/pedidos/pedidos-realizar/pedidos-realizar.component';
import { PedidosListadoComponent } from './pages/pedidos/pedidos-listado/pedidos-listado.component';
import { PedidosVerPedidosComponent } from './pages/pedidos/pedidos-ver-pedidos/pedidos-ver-pedidos.component';
import { AdminConfiguracionMediosDePagoComponent } from './pages/admin/admin-configuracion-medios-de-pago/admin-configuracion-medios-de-pago.component';
import { NgxPaginationModule } from 'ngx-pagination';







@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    GestionArticulosComponent,
    VentasComponent,
    PedidosComponent,
    CierreComponent,
    SidebarComponent,
    ListadoComponent,
    AdminComponent,
    LoginComponent,
    AdminUsuarioComponent,
    SidebarVentasComponent,
    AdminVentaComponent,
    AdminGestionComponent,
    CargarVentaComponent,
    ProductosListaComponent,
    CheckoutComponent,
    ItemCarritoComponent,
    CardProductosComponent,
    CheckoutItemComponent,
    ModalAplicarDescuentoComponent,
    CapitalizePipe,
    AdminConfiguracionArticuloComponent,
    AdminConfiguracionCategoriasComponent,
    AdminConfiguracionMarcasComponent,
    AdminConfiguracionLocalComponent,
    SidebarPedidosComponent,
    PedidosRealizarComponent,
    PedidosListadoComponent,
    PedidosVerPedidosComponent,
    AdminConfiguracionMediosDePagoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
