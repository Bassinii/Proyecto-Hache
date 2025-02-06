import { HttpClientModule } from '@angular/common/http';
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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
