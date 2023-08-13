import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMenuComponent } from './header-menu.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderMenuComponent
  ],
  imports: [
    CommonModule, IonicModule, RouterModule
  ],
  exports: [
    HeaderMenuComponent
  ]
})
export class HeaderMenuModule { }