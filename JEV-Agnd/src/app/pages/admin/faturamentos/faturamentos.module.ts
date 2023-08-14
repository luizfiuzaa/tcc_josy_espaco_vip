import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaturamentosPageRoutingModule } from './faturamentos-routing.module';

import { FaturamentosPage } from './faturamentos.page';

import { HeaderMenuModule } from 'src/app/components/header-menu/header-menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaturamentosPageRoutingModule,
    HeaderMenuModule
  ],
  declarations: [FaturamentosPage]
})
export class FaturamentosPageModule {}
