import { HeaderMenuComponent } from './../components/header-menu/header-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgCalendarModule
  ],
  declarations: [
    HomePage,
    HeaderMenuComponent
  ]
})
export class HomePageModule {}
