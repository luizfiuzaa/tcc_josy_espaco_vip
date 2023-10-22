import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { timestamp } from 'rxjs';
import { Clientes } from 'src/app/models/clientes';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { InfoClientes } from 'src/app/models/infoClientes';
import { Router } from '@angular/router';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  cliente: any;
  ClienteCad: Clientes[] = [];
  clientes_Exibidos: Clientes[] = [];
  Info_Clientes: InfoClientes[] = [];

  filterClienteName(e: Event) {
    let estado: boolean = false;
    const value = (e.target as HTMLInputElement).value;

    this.clientes_Exibidos = this.ClienteCad.filter((cliente) => {
      if (cliente.cliente_nome.toLocaleLowerCase().includes(value.toLocaleLowerCase()) || cliente.cliente_email.includes(value)) {
        estado = true;
      }
      console.log(value)
      return cliente.cliente_nome.toLocaleLowerCase().includes(value.toLocaleLowerCase()) || cliente.cliente_email.includes(value);
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

  constructor(private clientesService: ClientesService, private router: Router) {
    this.list_clientes()
  }
  isLoading: boolean = false;
  list_clientes() {
    this.isLoading = true;
    this.clientesService.list().subscribe((dados: any) => {
      this.isLoading = false;
      console.log(dados)
      console.log(dados.clientes)
      this.ClienteCad = dados.clientes;
      if (!dados.success || dados.success != 1) {
        this.ClienteCad = [];
      }
      this.clientes_Exibidos = this.ClienteCad.map((dados: any) => {
        var numero = '(' + dados.cliente_tel.substr(0, 2) + ') ' + dados.cliente_tel.substr(2, 5) + '-' + dados.cliente_tel.substr(7, 4);
        return { ...dados, cliente_tel: numero };
      });
    })
  }
  indiceDel: any
  apagarService(indice: any) {
    this.indiceDel = indice
    this.setOpenDelete(true);
  }

  // Modal de delete confirm
  modalOpenDelete = false;
  setOpenDelete(isOpen: any) {
    this.modalOpenDelete = isOpen;
  }
  public alertButtons = [
    {
      text: 'Não',
      role: 'cancel',
    },
    {
      text: 'Sim',
      role: 'confirm',
    },
  ];
  setResult(ev: any) {
    // O role pode ser confirm or cancel
    console.log(ev.detail.role);
    this.setOpenDelete(false);
    if (ev.detail.role == 'confirm') {
      this.clientesService.delete(this.indiceDel).subscribe(() => {
        this.ClienteCad = this.ClienteCad.filter((cliente: any) => cliente.id_cliente !== this.indiceDel);
        this.clientes_Exibidos = this.ClienteCad;
      });
    }
  }

  // modal
  EditForm!: FormGroup;
  modalOpenEdit = false;

  submit_edit() {
    console.log(this.EditForm.value)
    if (this.EditForm.valid) {
      console.log('Formulario De Edição Valido')
      if (this.EditForm.valid) {
        let cliente = {
          id: this.EditForm.value.idCli_edit,
          nome: this.EditForm.value.nomeCli_edit.toLocaleLowerCase(),
          telefone: this.EditForm.value.telCli_edit.replace('(', '').replace(')', '').replace(' ', '').replace('-', ''),
          email: this.EditForm.value.emailCli_edit,
        }
        this.clientesService.update(cliente).subscribe(() => {
          this.list_clientes();
        })
      }
      // this.message = 'Agendado com sucesso!!'
      // this.ExibirMessage(true);
      return;
    }
    console.log('Formulario De Edição Invalido')
    // this.message = 'Falha ao agendar!!'
    // this.ExibirMessage(false);
  }

  setOpenEdit(isOpen: any) {
    if (isOpen == true || isOpen == false || this.EditForm.valid && isOpen == 'submit') {
      this.modalOpenEdit = isOpen == 'submit' ? false : isOpen;
    }
  }
  editarCliente(cliente: Clientes) {
    this.createFormEdit(cliente);
    this.setOpenEdit(true);
  }

  createFormEdit(cliente: Clientes) {
    this.EditForm = new FormGroup({
      idCli_edit: new FormControl(cliente.id_cliente),
      nomeCli_edit: new FormControl(cliente.cliente_nome, Validators.compose([
        Validators.maxLength(70),
        Validators.minLength(3),
        Validators.required])),
      telCli_edit: new FormControl(cliente.cliente_tel, Validators.compose([
        Validators.maxLength(15),
        Validators.minLength(15),
        Validators.required])),
      emailCli_edit: new FormControl(cliente.cliente_email, Validators.compose([
        Validators.maxLength(70),
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
        Validators.required])),
    });
  }

  get nomeCli_edit() {
    return this.EditForm.get('nomeCli_edit')!;
  }
  get telCli_edit() {
    return this.EditForm.get('telCli_edit')!;
  }
  get emailCli_edit() {
    return this.EditForm.get('emailCli_edit')!;
  }
  // modal
  AddForm!: FormGroup;
  modalOpenAdd = false;

  submit_add() {
    console.log(this.AddForm.value)
    if (this.AddForm.valid) {
      let cliente = [];

      cliente[0] = {
        nomeCli: this.AddForm.value.nomeCli.toLocaleLowerCase(),
        emailCli: this.AddForm.value.emailCli,
        telCli: this.AddForm.value.telCli.replace('(', '').replace(')', '').replace(' ', '').replace('-', ''),
      }

      this.clientesService.create(cliente).subscribe(() => {
        this.list_clientes();
      });
      console.log('Formulario De Adição Valido')
      // this.message = 'Agendado com sucesso!!'
      // this.ExibirMessage(true);
      return;
    }
    console.log('Formulario De Adição Invalido')
    // this.message = 'Falha ao agendar!!'
    // this.ExibirMessage(false);
  }

  setOpenAdd(isOpen: any) {
    if (isOpen == true || isOpen == false || this.AddForm.valid && isOpen == 'submit') {
      this.modalOpenAdd = isOpen == 'submit' ? false : isOpen;
    }
    if (isOpen == true) {
      this.createFormAdd()
    }
  }

  createFormAdd() {
    this.AddForm = new FormGroup({
      nomeCli: new FormControl('', Validators.compose([
        Validators.maxLength(70),
        Validators.minLength(3),
        Validators.required])),
      telCli: new FormControl('', Validators.compose([
        Validators.maxLength(15),
        Validators.minLength(15),
        Validators.required])),
      emailCli: new FormControl('', Validators.compose([
        Validators.maxLength(70),
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
        Validators.required]))
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

  modalOpenInfo: boolean = false;
  setOpenInfo(isOpen: any) {
    this.modalOpenInfo = isOpen;
  }

  agendar() {
    this.setOpenInfo(false);
    setTimeout(() => {
      this.router.navigate(['/home'])
    }, 100)
  }

  listInformacoes(id: any) {
    this.Info_Clientes = [];
    this.clientesService.listInfomacoes(id).subscribe((dados: any) => {
      if (dados.success == '1') {
        this.Info_Clientes = dados.data;

        this.Info_Clientes.sort((a, b) => {
          let dataA = new Date(a.data_agend + " " + a.hora_inicio_agendamento);
          let dataB = new Date(b.data_agend + " " + b.hora_inicio_agendamento);
          return dataB.getTime() - dataA.getTime();
        });
        console.log(this.Info_Clientes);
        this.Info_Clientes = this.Info_Clientes.map((dados: any) => {
          let data: any = dados.data_agend.split("-");
          data = `${data[2]}/${data[1]}/${data[0]}`

          let horario_inicio: any = dados.hora_inicio_agendamento.substr(0, 5);
          let horario_fim: any = dados.hora_fim_agendamento.substr(0, 5);
          return { ...dados, data_agend: data, hora_inicio_agendamento: horario_inicio, hora_fim_agendamento: horario_fim };
        });
        console.log(this.Info_Clientes);
      }
    })

    this.setOpenInfo(true)
  }

  ngOnInit() { }

  readonly phoneMask: MaskitoOptions = {
    mask: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();
}



