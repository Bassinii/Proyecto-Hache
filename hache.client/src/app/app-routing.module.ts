import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevaVentaComponent } from './pages/nueva-venta/nueva-venta.component';

const routes: Routes = [
  { path: 'nueva-venta', component: NuevaVentaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
