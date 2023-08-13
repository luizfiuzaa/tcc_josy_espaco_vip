import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MsgDefinidasPageRoutingModule } from './msg-definidas-routing.module';

import { MsgDefinidasPage } from './msg-definidas.page';
import { HeaderMenuModule } from 'src/app/components/header-menu/header-menu.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderMenuModule,
    MsgDefinidasPageRoutingModule
  ],
  declarations: [MsgDefinidasPage]
})
export class MsgDefinidasPageModule {}
