import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevaVentaComponent } from './pages/nueva-venta/nueva-venta.component';
import { GestionArticulosComponent } from './pages/gestion-articulos/gestion-articulos.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { CierreComponent } from './pages/cierre/cierre.component';

const routes: Routes = [
  { path: '', redirectTo: '/nueva-venta', pathMatch: 'full' },
  { path: 'nueva-venta', component: NuevaVentaComponent },
  { path: 'gestion-articulos', component: GestionArticulosComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'cierre', component: CierreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
