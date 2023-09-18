import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { timestamp } from 'rxjs';
import { Agendamentos } from 'src/app/models/agendamentos';
import { AgendamentosService } from 'src/app/services/agendamentos/agendamentos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  OpenToast = false;
  mensagem: any = false;
  Isloading = false;

  ExibirMensagem() {
    this.OpenToast = true;
    setTimeout(() => {
      this.OpenToast = false;
    }, 3000)
  }
  Agendamentos: Agendamentos[] = []

  Agendamentos_exibidos: Agendamentos[] = this.Agendamentos;

  constructor(private agendamentosService: AgendamentosService) {
    this.getAgendamentos();
  }

  getAgendamentos(){
    this.Isloading = true;
    setTimeout(()=>{
    this.agendamentosService.list().subscribe(dados =>{ 
      this.Agendamentos = dados;
      console.log(this.Agendamentos);
      this.Agendamentos_exibidos = this.Agendamentos;
      this.Isloading = false;
    })
    },3000)
  }

  ngOnInit() {

  }
  AddForm!: FormGroup;
  modalOpenAdd = false;
  submit_add() {
    console.log(this.AddForm.value)
    if (this.AddForm.invalid) {
      console.log('Formulario De Adição Invalido')
      this.mensagem = 'Falha ao agendar!!'
      this.ExibirMensagem();
      return;
    }
    console.log('Formulario De Adição Valido')
    this.mensagem = 'Agendado com sucesso!!'
    this.ExibirMensagem();
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
    if (isOpen == 'submit' && this.AddForm.valid) {
      setTimeout(() => {
        this.modalOpenAdd = false;
      }, 100);
    }
  }
  createFormAdd() {
    this.AddForm = new FormGroup({
      id: new FormControl(''),
      cliente: new FormControl('', [Validators.required]),
      calendario: new FormControl('', [Validators.required]),
      servicos: new FormControl('', [Validators.required]),
      formaDePagamento: new FormControl('', [Validators.required])
    });
  }
  get cliente_add() {
    return this.AddForm.get('cliente')!;
  }
  get calendario_add() {
    return this.AddForm.get('calendario')!;
  }
  get servicos_add() {
    return this.AddForm.get('servicos')!;
  }
  get formaDePagamento_add() {
    return this.AddForm.get('formaDePagamento')!;
  }

  EditForm!: FormGroup;
  modalOpenEdit = false;
  submit_edit() {
    console.log(this.EditForm.value)
    if (this.EditForm.invalid) {
      console.log('Formulario De Edição Invalido')
      this.mensagem = 'Falha ao alterar!!'
      this.ExibirMensagem();
      return;
    }
    console.log('Formulario De Edição Valido')
    this.mensagem = 'Alterado com sucesso!!'
    this.ExibirMensagem();
  }
  setOpenEdit(isOpen: any) {
    if (isOpen == true) {
      this.modalOpenEdit = isOpen;
      this.createFormEdit();
      return;
    }
    if (isOpen == false) {
      this.modalOpenEdit = isOpen;
      return;
    }
    if (isOpen == 'submit' && this.EditForm.valid) {
      setTimeout(() => {
        this.modalOpenEdit = false;
      }, 100);
    }
  }
  createFormEdit() {
    this.EditForm = new FormGroup({
      id: new FormControl(''),
      cliente: new FormControl('', [Validators.required]),
      servicos: new FormControl('', [Validators.required]),
      formaDePagamento: new FormControl('', [Validators.required])
    });
  }
  get cliente_edit() {
    return this.EditForm.get('cliente')!;
  }
  get servicos_edit() {
    return this.EditForm.get('servicos')!;
  }
  get formaDePagamento_edit() {
    return this.EditForm.get('formaDePagamento')!;
  }

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

  }

  search(e: Event): void {
    let estado: boolean = false;
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.Agendamentos_exibidos = this.Agendamentos.filter((agendamento) => {
      if (agendamento.data.includes(value) == true) {
        estado = true;
      }
      return agendamento.data.includes(value);
    });
    this.verificarEstado(estado);
  }

  verificarEstado(estado: any) {
    if (!estado) {
      setTimeout(() => {
        this.Agendamentos_exibidos = this.Agendamentos
      }, 1000)
    }
  }

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    /**
     * Date will be enabled if it is not
     * Sunday or Saturday
     */
    return utcDay !== 0 && utcDay !== 6;
  };

}