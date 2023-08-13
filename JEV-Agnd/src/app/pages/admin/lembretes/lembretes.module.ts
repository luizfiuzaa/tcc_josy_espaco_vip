import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LembretesPageRoutingModule } from './lembretes-routing.module';

import { LembretesPage } from './lembretes.page';
import { HeaderMenuModule } from 'src/app/components/header-menu/header-menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LembretesPageRoutingModule,
    HeaderMenuModule
  ],
  declarations: [LembretesPage]
})
export class LembretesPageModule {}
