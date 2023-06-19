import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { EnumRutasPaginas } from 'src/enums/enumRutasPaginas';

const routes: Routes = [
  {
    path: EnumRutasPaginas.INICIO,
    component: InicioComponent,
    pathMatch: 'full',
  },
  {
    path: EnumRutasPaginas.FORMULARIO,
    component: FormularioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
