import { Component, Input, OnInit } from '@angular/core';
import { Lembretes } from 'src/app/models/lembretes';
import { LembretesService } from 'src/app/services/lembretes/lembretes.service';

@Component({
  selector: 'app-lembretes',
  templateUrl: './lembretes.page.html',
  styleUrls: ['./lembretes.page.scss'],
})
export class LembretesPage implements OnInit {
  Lembretes: Lembretes[] = [];

  ngOnInit() {
  };

  constructor(private LembretesService: LembretesService) {
    this.list_lembretes()
  };

  list_lembretes() {
    this.LembretesService.list().subscribe((dados: any) => {
      if (dados.success == '1') {
        this.Lembretes = dados.lembretes;
        return;
      }
      this.Lembretes = [];
    })
  }

  remover_cliente(id: any) {
    this.LembretesService.delete(id).subscribe(() => this.Lembretes = this.Lembretes.filter((lembrete: any) => lembrete.id !== id));
  }
}