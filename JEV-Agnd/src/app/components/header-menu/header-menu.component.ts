import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  constructor(private menu: MenuController){}

  menuClose(){
    this.menu.close();
  }

  ngOnInit(): void {
    
  }

  // refresh (): void { window.location.reload (); }


}
