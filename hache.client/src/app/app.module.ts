import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NuevaVentaComponent } from './pages/nueva-venta/nueva-venta.component';
import { CarritoComponent } from './pages/nueva-venta/carrito/carrito.component';
import { ListaProductosComponent } from './pages/nueva-venta/lista-productos/lista-productos.component';
import { CarritoItemComponent } from './pages/nueva-venta/carrito/carrito-item/carrito-item.component';
import { ProductoCardComponent } from './pages/nueva-venta/lista-productos/producto-card/producto-card.component';
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
import { ModalCarritoItemComponent } from './pages/nueva-venta/modal-checkout/modal-carrito-item/modal-carrito-item.component';
import { SidebarVentasComponent } from './pages/ventas/sidebar-ventas/sidebar-ventas.component';
import { AdminVentaComponent } from './pages/admin/admin-venta/admin-venta.component';
import { AdminGestionComponent } from './pages/admin/admin-gestion/admin-gestion.component';
import { ModalCheckoutComponent } from './pages/nueva-venta/modal-checkout/modal-checkout.component';
import { CargarVentaComponent } from './pages/cargar-venta/cargar-venta.component';
import { ProductosListaComponent } from './pages/cargar-venta/productos-lista/productos-lista.component';
import { CheckoutComponent } from './pages/cargar-venta/checkout/checkout.component';
import { ItemCarritoComponent } from './pages/cargar-venta/item-carrito/item-carrito.component';
import { CardProductosComponent } from './pages/cargar-venta/productos-lista/card-productos/card-productos.component';
import { CheckoutItemComponent } from './pages/cargar-venta/checkout/checkout-item/checkout-item.component';







@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    NuevaVentaComponent,
    CarritoComponent,
    ListaProductosComponent,
    CarritoItemComponent,
    ProductoCardComponent,
    GestionArticulosComponent,
    VentasComponent,
    PedidosComponent,
    CierreComponent,
    SidebarComponent,
    ListadoComponent,
    AdminComponent,
    LoginComponent,
    AdminUsuarioComponent,
    ModalCarritoItemComponent,
    SidebarVentasComponent,
    AdminVentaComponent,
    AdminGestionComponent,
    ModalCheckoutComponent,
    CargarVentaComponent,
    ProductosListaComponent,
    CheckoutComponent,
    ItemCarritoComponent,
    CardProductosComponent,
    CheckoutItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
