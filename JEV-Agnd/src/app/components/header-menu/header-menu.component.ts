import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login/login.service';
import { LembretesService } from 'src/app/services/lembretes/lembretes.service';
import { Lembretes } from 'src/app/models/lembretes';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  numeroLembretes: Number = 0;
  Lembretes: Lembretes[] = [];
  Lembretes_exibidos: Lembretes[] = [];

  constructor(private menu: MenuController, private login: LoginService, private lembretesService: LembretesService) {
    this.lembretesService.list().subscribe((dados: any) => {
      if (dados.success == '1') {
        let dataAtual = new Date();
        let dataAmanha = new Date();
        dataAmanha.setDate(dataAtual.getDate() + 1);
        dataAmanha.setHours(0, 0, 0, 0);
        this.Lembretes = dados.lembretes;
        this.Lembretes_exibidos = this.Lembretes.filter((lembrete: any) => {
          let dataLembrete = new Date(`${lembrete.dataLembrete}T${lembrete.horario}`);
          let duasHorasAntes = new Date(dataLembrete.getTime() - 2 * 60 * 60 * 1000);
          return dataAtual >= duasHorasAntes && dataAtual < dataLembrete
        })
        this.numeroLembretes = this.Lembretes_exibidos.length;
        this.lembretesService.atualizarContagem(this.Lembretes_exibidos.length);
        return;
      }
      this.Lembretes = [];
      this.Lembretes_exibidos = this.Lembretes;
      this.numeroLembretes = this.Lembretes_exibidos.length;
      console.log(this.numeroLembretes)
    })
    this.lembretesService.atualizarContagem(this.Lembretes_exibidos.length);
  }

  menuClose() {
    this.menu.close();
  }

  deslogar() {
    this.login.deslogar();
  }

  ngOnInit(): void {

  }
}
