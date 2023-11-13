import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaskitoModule } from '@maskito/angular';
// import { HeaderMenuModule } from 'src/app/components/header-menu/header-menu.module';

import { ClientesPageRoutingModule } from './clientes-routing.module';

import { ClientesPage } from './clientes.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ClientesPageRoutingModule,
    MaskitoModule,
    // HeaderMenuModule
  ],
  declarations: [ClientesPage],
})
export class ClientesPageModule { }
