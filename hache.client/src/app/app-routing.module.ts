import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevaVentaComponent } from './pages/nueva-venta/nueva-venta.component';
import { GestionArticulosComponent } from './pages/gestion-articulos/gestion-articulos.component';

const routes: Routes = [
  { path: '', redirectTo: '/nueva-venta', pathMatch: 'full' },
  { path: 'nueva-venta', component: NuevaVentaComponent },
  { path: 'gestion-articulos', component: GestionArticulosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
