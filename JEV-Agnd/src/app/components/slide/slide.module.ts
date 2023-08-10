import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideComponent } from './slide.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    SlideComponent
  ],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [
    SlideComponent
  ]
})
export class SlideModule { }
