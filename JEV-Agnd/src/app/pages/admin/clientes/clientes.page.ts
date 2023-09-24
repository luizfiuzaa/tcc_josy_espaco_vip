import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { timestamp } from 'rxjs';
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

  // modal
  AddForm!: FormGroup;
  modalOpenAdd = false;

  submit_add() {
    console.log(this.AddForm.value)
    if (this.AddForm.invalid) {
      console.log('Formulario De Adição Invalido')
      // this.message = 'Falha ao agendar!!'
      // this.ExibirMessage(false);
      return;
    }
    console.log('Formulario De Adição Valido')
    // this.message = 'Agendado com sucesso!!'
    // this.ExibirMessage(true);
  }

  setOpenAdd(isOpen: any) {
    if (isOpen == true) {
      this.modalOpenAdd = isOpen;
      this.createFormAdd();
      return;
    }
    if (isOpen == false) {
      this.modalOpenAdd = isOpen;
      return;
    }
    if (isOpen == 'submit') {
      setTimeout(() => {
        this.modalOpenAdd = false;
      }, 100);
    }
  }

  createFormAdd() {
    this.AddForm = new FormGroup({
      idCli: new FormControl(''),
      nomeCli: new FormControl('', [Validators.required]),
      telCLi: new FormControl('', [Validators.required]),
      emailCli: new FormControl('', [Validators.required]),
    });
  }

  get nomeCli_add() {
    return this.AddForm.get('nomeCli')!;
  }
  get telCli_add() {
    return this.AddForm.get('telCli')!;
  }
  get emailCli_add() {
    return this.AddForm.get('emailCli')!;
  }

  ngOnInit() { }
}
