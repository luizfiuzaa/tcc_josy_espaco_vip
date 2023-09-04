import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaturamentosPageRoutingModule } from './faturamentos-routing.module';

import { FaturamentosPage } from './faturamentos.page';

import { ServicosComponent } from 'src/app/components/graficos/pizza/servicos/servicos.component';
import { FaturamentoComponent } from 'src/app/components/graficos/pizza/faturamento/faturamento.component';
import { ColunaComponent } from 'src/app/components/graficos/coluna/coluna.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaturamentosPageRoutingModule
  ],
  declarations: [FaturamentosPage, ServicosComponent, FaturamentoComponent, ColunaComponent]
})
export class FaturamentosPageModule { }
