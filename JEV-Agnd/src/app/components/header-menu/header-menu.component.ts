import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  constructor(private menu: MenuController, private login: LoginService){}

  menuClose(){
    this.menu.close();
  }

  deslogar(){
    this.login.deslogar();
  }

  ngOnInit(): void {
    
  }

  // refresh (): void { window.location.reload (); }


}
