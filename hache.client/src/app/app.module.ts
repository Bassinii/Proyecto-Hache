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
import { ModalCarritoItemComponent } from './pages/nueva-venta/modal-carrito-item/modal-carrito-item.component';
import { SidebarVentasComponent } from './pages/ventas/sidebar-ventas/sidebar-ventas.component';
import { AdminVentaComponent } from './pages/admin/admin-venta/admin-venta.component';
import { AdminGestionComponent } from './pages/admin/admin-gestion/admin-gestion.component';




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
