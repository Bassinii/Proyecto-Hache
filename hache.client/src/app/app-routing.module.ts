import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevaVentaComponent } from './pages/nueva-venta/nueva-venta.component';
import { GestionArticulosComponent } from './pages/gestion-articulos/gestion-articulos.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { CierreComponent } from './pages/cierre/cierre.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './auth/login/login.component';
import { authguardGuard } from './auth/authGuard/authguard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'nueva-venta', component: NuevaVentaComponent, canActivate: [authguardGuard] },
  { path: 'gestion-articulos', component: GestionArticulosComponent, canActivate: [authguardGuard] },
  { path: 'ventas', component: VentasComponent, canActivate: [authguardGuard] },
  { path: 'pedidos', component: PedidosComponent, canActivate: [authguardGuard] },
  { path: 'cierre', component: CierreComponent, canActivate: [authguardGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [authguardGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
