import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaturamentosPage } from './faturamentos.page';

const routes: Routes = [
  {
    path: '',
    component: FaturamentosPage
  },
  {
    path: 'faturamentos',
    component: FaturamentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaturamentosPageRoutingModule {}
