import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaturamentosPageRoutingModule } from './faturamentos-routing.module';

import { FaturamentosPage } from './faturamentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaturamentosPageRoutingModule
  ],
  declarations: [FaturamentosPage]
})
export class FaturamentosPageModule {}
