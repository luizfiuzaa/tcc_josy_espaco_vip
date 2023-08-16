import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SobreComponent } from './sobre.component';
import { RouterModule } from '@angular/router';
import { FooterModule } from '../../../components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FooterModule,
    RouterModule,
    SobreComponent
  ],
  declarations: [SobreComponent]
})
export class LandingPageModule {}
