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

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    NuevaVentaComponent,
    CarritoComponent,
    ListaProductosComponent
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
