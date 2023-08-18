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

  ngOnInit() {
  }

  ClientesCadastrados: any[] = [
    // {
    //   ClienteNome: 'Fernanda Soares',
    //   ClienteEmail: 'fernanda.soares@gmail.com',
    //   ClienteTelefone: '15 99456-3468'
    // },
    // {
    //   ClienteNome: 'Fernanda Soares',
    //   ClienteEmail: 'fernanda.soares@gmail.com',
    //   ClienteTelefone: '15 99456-3468'
    // },
    // {
    //   ClienteNome: 'Fernanda Soares',
    //   ClienteEmail: 'fernanda.soares@gmail.com',
    //   ClienteTelefone: '15 99456-3468'
    // },
  ]

}
