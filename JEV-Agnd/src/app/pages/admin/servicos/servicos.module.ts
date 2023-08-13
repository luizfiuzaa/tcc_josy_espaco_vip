import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicosPageRoutingModule } from './servicos-routing.module';

import { ServicosPage } from './servicos.page';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { HeaderMenuModule } from 'src/app/components/header-menu/header-menu.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicosPageRoutingModule,
    FooterModule,
    HeaderMenuModule
  ],
  declarations: [ServicosPage]
})
export class ServicosPageModule {}
