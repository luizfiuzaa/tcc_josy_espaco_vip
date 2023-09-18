import { Component, Input, OnInit } from '@angular/core';
import { Clientes } from 'src/app/models/clientes';
import { ClientesService } from 'src/app/services/clientes/clientes.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  ClienteCad: Clientes[] = [];
  clientes_Exibidos: Clientes[] = [];
  
  filterClienteName(e: Event) {
    let estado: boolean = false;
    const target = e.target as HTMLInputElement;
    const value = target.value;
    console.log(value)

    this.clientes_Exibidos = this.ClienteCad.filter((cliente) => {
      if (cliente.ClienteNome.includes(value.toLocaleLowerCase()) == true || cliente.ClienteEmail.includes(value) == true) {
        estado = true;
      }
      return cliente.ClienteNome.includes(value.toLocaleLowerCase()) || cliente.ClienteEmail.includes(value) == true;
    });
    this.verificarEstado(estado);
  }

  verificarEstado(estado: any) {
    if (!estado) {
      setTimeout(() => {
        this.clientes_Exibidos = this.ClienteCad
      }, 1000)
    }
  }

  constructor(private clientesService: ClientesService) {
    this.cad_cli()
  }

  cad_cli() {
   this.clientesService.list().subscribe(dados => { 
    this.ClienteCad = dados;
    this.clientes_Exibidos = this.ClienteCad;
    console.log(this.ClienteCad);
  })
  }
  ngOnInit() { }
}
