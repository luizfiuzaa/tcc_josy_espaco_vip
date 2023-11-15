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
    this.lembretesService.contagem().subscribe((dados: any) => {
      this.lembretesService.atualizarContagem(dados.contador);
      this.numeroLembretes = dados.contador;
    })
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
