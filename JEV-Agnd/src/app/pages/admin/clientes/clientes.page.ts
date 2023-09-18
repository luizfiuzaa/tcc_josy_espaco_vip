import { Component, Input, OnInit } from '@angular/core';
import { Clientes } from 'src/app/models/clientes';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  @Input() ClienteCad: Clientes[] = [];

  clientes = [];
  cliente = {
    nome: null,
    tel: null
  }

  constructor() {
    this.cad_cli()
  }

  cad_cli() {
    console.log("laura")
    // fetch('http://filhodonordeste.lovestoblog.com/')
    fetch('http://127.0.0.1/aula/php/')
      .then(response => response.json())
      // .then(response => console.log(response))
      .then(resposta => {
        // tranforma o json em string
        // localStorage.setItem('nome_cliente', JSON.stringify(resposta.nome))
        // localStorage.setItem('tel_cliente', JSON.stringify(resposta.tel))

        // coloca cliente dentro do array ClientesCadastrados
        resposta.forEach((element: any) => {
          console.log(resposta.nome)
          this.ClientesCadastrados.push({
            ClienteNome: element.nome,
            ClienteEmail: element.email,
            ClienteTelefone: element.tel
          })
        });

        console.log(resposta)

        // console.log((localStorage.getItem('nome_cliente')))
        // console.log((localStorage.getItem('tel_cliente')))
      })

      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        console.log("Processo Finalizado")
      });

  }
  criarCliente(dados: any) {
    this.cliente.nome = dados.nome;
    this.cliente.tel = dados.tel;
  }
  ngOnInit() { }
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
