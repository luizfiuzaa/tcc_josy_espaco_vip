import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MsgDefinidasPage } from './msg-definidas.page';

const routes: Routes = [
  {
    path: '',
    component: MsgDefinidasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MsgDefinidasPageRoutingModule {}
