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





const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'gestion-articulos', component: GestionArticulosComponent, canActivate: [authguardGuard] },
  { path: 'ventas', component: VentasComponent, canActivate: [authguardGuard] },
  { path: 'pedidos', component: PedidosComponent, canActivate: [authguardGuard] },
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
      
    ]
  },

  {
    path: "cargar-venta", component: CargarVentaComponent, canActivate: [authguardGuard],
    children: [
      { path: '', redirectTo: 'productos-lista', pathMatch: 'full' },
      { path: 'productos-lista', component: ProductosListaComponent, canActivate: [authguardGuard] },
    ]
  },


 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

