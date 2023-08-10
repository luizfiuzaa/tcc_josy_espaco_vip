import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingPageRoutingModule } from './landing-routing.module';

import { LandingPage } from './landing.page';

import { CarouselModule } from '../../components/carousel/carousel.module';
import { SlideModule } from '../../components/slide/slide.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandingPageRoutingModule,
    CarouselModule,
    SlideModule
  ],
  declarations: [LandingPage]
})
export class LandingPageModule {}
