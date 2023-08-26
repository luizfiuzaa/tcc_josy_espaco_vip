import { Component, Input, OnInit } from '@angular/core';

interface ClientesCadastrados {
  ClienteName: string;
  ClienteEmail: string;
  ClienteTelefone: string;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  @Input() ClienteCad: ClientesCadastrados[] = [];

  constructor() { }

  
  exibir(){
    console.log('oi')
  }

  ngOnInit() {
  }

  ClientesCadastrados: any[] = [
    {
      ClienteNome: 'Luiza Fiuze',
      ClienteEmail: 'lui.fiuze@gmail.com',
      ClienteTelefone: '15 99999-9998'
    },
    {
      ClienteNome: 'Claudinha Buxexa',
      ClienteEmail: 'caluBuxa@gmail.com',
      ClienteTelefone: '15 99999-9997'
    },
    {
      ClienteNome: 'Lauro Pinheiro',
      ClienteEmail: 'laura.peneira@gmail.com',
      ClienteTelefone: '15 99999-9996'
    },
    {
      ClienteNome: 'Joana Victoria',
      ClienteEmail: 'joavi.c@gmail.com',
      ClienteTelefone: '15 99999-9995'
    },
    {
      ClienteNome: 'Marlene Steps',
      ClienteEmail: 'marlene.stp@gmail.com',
      ClienteTelefone: '15 99999-9994'
    },
  ]

}
