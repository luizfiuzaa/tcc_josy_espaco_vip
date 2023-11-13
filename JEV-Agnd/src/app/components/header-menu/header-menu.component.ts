import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login/login.service';
import { LembretesService } from 'src/app/services/lembretes/lembretes.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  numeroLembretes: Number = 0;

  constructor(private menu: MenuController, private login: LoginService, private lembretesService: LembretesService) {
    this.lembretesService.list().subscribe((dados: any) => {
      if (dados.success == 1) {
        this.numeroLembretes = dados.lembretes.length;
        console.log(dados.lembretes.length)
      } else {
        this.numeroLembretes = 0;
      }
    });
    console.log(this.numeroLembretes);
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
