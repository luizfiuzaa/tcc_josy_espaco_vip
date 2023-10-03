import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicosPageRoutingModule } from './servicos-routing.module';
import { MaskitoModule } from '@maskito/angular';

import { ServicosPage } from './servicos.page';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicosPageRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MaskitoModule
  ],
  declarations: [ServicosPage]
})
export class ServicosPageModule {}
