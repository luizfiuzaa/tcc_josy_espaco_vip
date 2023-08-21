import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicosPageRoutingModule } from './servicos-routing.module';

import { ServicosPage } from './servicos.page';
import { HeaderMenuModule } from 'src/app/components/header-menu/header-menu.module'; 
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicosPageRoutingModule,
    HeaderMenuModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [ServicosPage]
})
export class ServicosPageModule {}
