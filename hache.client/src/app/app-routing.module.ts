import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionArticulosComponent } from './pages/gestion-articulos/gestion-articulos.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { CierreComponent } from './pages/cierre/cierre.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './auth/login/login.component';
import { authguardGuard } from './auth/authGuard/authguard.guard';
import { AdminUsuarioComponent } from './pages/admin/admin-usuario/admin-usuario.component';
import { AdminVentaComponent } from './pages/admin/admin-venta/admin-venta.component';
import { AdminGestionComponent } from './pages/admin/admin-gestion/admin-gestion.component';
import { CargarVentaComponent } from './pages/cargar-venta/cargar-venta.component';
import { ProductosListaComponent } from './pages/cargar-venta/productos-lista/productos-lista.component';
import { CheckoutComponent } from './pages/cargar-venta/checkout/checkout.component';
import { ItemCarritoComponent } from './pages/cargar-venta/item-carrito/item-carrito.component';
import { AdminConfiguracionArticuloComponent } from './pages/admin/admin-configuracion-articulo/admin-configuracion-articulo.component';
import { AdminConfiguracionMarcasComponent } from './pages/admin/admin-configuracion-marcas/admin-configuracion-marcas.component';
import { AdminConfiguracionLocalComponent } from './pages/admin/admin-configuracion-local/admin-configuracion-local.component';
import { AdminConfiguracionCategoriasComponent } from './pages/admin/admin-configuracion-categorias/admin-configuracion-categorias.component';
import { PedidosRealizarComponent } from './pages/pedidos/pedidos-realizar/pedidos-realizar.component';
import { PedidosListadoComponent } from './pages/pedidos/pedidos-listado/pedidos-listado.component';
import { PedidosVerPedidosComponent } from './pages/pedidos/pedidos-ver-pedidos/pedidos-ver-pedidos.component';
import { AdminConfiguracionMediosDePagoComponent } from './pages/admin/admin-configuracion-medios-de-pago/admin-configuracion-medios-de-pago.component';






const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'gestion-articulos', component: GestionArticulosComponent, canActivate: [authguardGuard] },
  { path: 'ventas', component: VentasComponent, canActivate: [authguardGuard] },
  
  { path: 'cierre', component: CierreComponent, canActivate: [authguardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authguardGuard] },
  { path: 'item-carrito', component: ItemCarritoComponent, canActivate: [authguardGuard] },

  {
    path: 'admin', component: AdminComponent, canActivate: [authguardGuard],
    children: [
      { path: '', redirectTo: 'admin-usuario', pathMatch: 'full' },
      { path: 'admin-usuario', component: AdminUsuarioComponent, canActivate: [authguardGuard] },
      { path: 'admin-venta', component: AdminVentaComponent, canActivate: [authguardGuard] },
      { path: 'admin-gestion', component: AdminGestionComponent, canActivate: [authguardGuard] },
      { path: 'admin-configuracion-articulo', component: AdminConfiguracionArticuloComponent, canActivate: [authguardGuard] },
      { path: 'admin-configuracion-categorias', component: AdminConfiguracionCategoriasComponent, canActivate: [authguardGuard] },
      { path: 'admin-configuracion-marcas', component: AdminConfiguracionMarcasComponent, canActivate: [authguardGuard] },
      { path: 'admin-configuracion-local', component: AdminConfiguracionLocalComponent, canActivate: [authguardGuard] },
      { path: 'admin-configuracion-medios-de-pago', component: AdminConfiguracionMediosDePagoComponent, canActivate: [authguardGuard]}
      
    ]
  },

  {
    path: "cargar-venta", component: CargarVentaComponent, canActivate: [authguardGuard],
    children: [
      { path: '', redirectTo: 'productos-lista', pathMatch: 'full' },
      { path: 'productos-lista', component: ProductosListaComponent, canActivate: [authguardGuard] },
    ]
  },

  {
    path: "pedidos", component: PedidosComponent, canActivate: [authguardGuard],
    children: [
      { path: '', component: PedidosListadoComponent, canActivate: [authguardGuard] },
      { path: 'pedidos-realizar/:id/:nombre', component: PedidosRealizarComponent, canActivate: [authguardGuard] },
      { path: 'pedidos-ver-pedidos', component: PedidosVerPedidosComponent, canActivate: [authguardGuard] },
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

