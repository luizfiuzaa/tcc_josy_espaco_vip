import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MsgDefinidasPageRoutingModule } from './msg-definidas-routing.module';

import { MsgDefinidasPage } from './msg-definidas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MsgDefinidasPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MsgDefinidasPage]
})
export class MsgDefinidasPageModule {}
