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
  message: any = false;
  isLoading = false;
  toast: any
  fakeCalendario: any
  date = new Date();
  hoje = String(this.date.getFullYear() + '-' + String(this.date.getMonth() + 1).padStart(2, '0') + '-' + this.date.getDate()).padStart(2, '0');
  diaValido: boolean = true;
  Agendamentos: Agendamentos[] = []
  Agendamentos_exibidos: Agendamentos[] = this.Agendamentos;


  getData(e: Event) {
    let target = e.target as HTMLInputElement
    let value = target.value;
    let valueArray = value.split('T')
    this.fakeCalendario.value = `${valueArray[0]} ${valueArray[1]}`;
  }

  filterDate(e: Event) {
    let estado: boolean = false;
    let target = e.target as HTMLInputElement
    let value = target.value;
    let valueArray = value.split('T')
    let diaBuscado = new Date(valueArray[0]);
    let hoje = new Date(this.hoje);
    console.log(diaBuscado);

    this.Agendamentos_exibidos = this.Agendamentos.filter((agendamento) => {
      if (diaBuscado < hoje) {
        this.diaValido = false;
        this.verificarEstado(estado);
        return;
      }
      if (agendamento.data.includes(valueArray[0]) == true) {
        estado = true;
      }
      return agendamento.data.includes(valueArray[0]);
    });
  }

  highlightedDates: any[] = [];

  diasAgendados() {
    this.highlightedDates = [];
    this.Agendamentos.forEach(element => {
      let data = new Date(element.data);
      if (this.date >=  data) {} else {
        let color = this.random()
        this.highlightedDates.push({ date: element.data, textColor: color[0], backgroundColor: color[1] })
      }
    });
  }

  random() {
    let cores = [['rgb(68, 10, 184)', 'rgb(211, 200, 229)'], ['var(--ion-color-secondary-contrast)', 'var(--ion-color-secondary)'], ['#800080', '#ffc0cb'], ['#09721b', '#c8e5d0']]
    return cores[Math.round(Math.random() * 3)]
  }

  calendario_open: boolean = false;

  open_calendario(isOpen: boolean) {
    this.calendario_open = isOpen;
    if (isOpen == true) {
      this.diasAgendados();
    }
  }

  ExibirMessage(estado: boolean) {
    if (estado) {
      this.toast.classList.remove('fail');
      this.toast.classList.add('success');
      this.OpenToast = true;
      setTimeout(() => {
        this.OpenToast = false;
      }, 3000);
      console.log(this.toast)
      return;
    }
    this.toast.classList.remove('success');
    this.toast.classList.add('fail');
    this.OpenToast = true;
    setTimeout(() => {
      this.OpenToast = false;
    }, 3000)
    console.log(this.toast)
  }


  constructor(private agendamentosService: AgendamentosService) {
    this.getAgendamentos();
    console.log(this.date)
    var data = new Date("2023-09-23");
    console.log("Data original: " + data);

    data.setDate(data.getDate() + 45);
    console.log("Data após adicionar 45 dias: " + data);
  }

  ngAfterViewInit() {
    this.toast = document.querySelector('#message') as HTMLElement;
  }

  getAgendamentos() {
    this.isLoading = true;
    fetch('././assets/agendamentos.json')
      .then(response => response.json())
      .then(response => {
        this.Agendamentos = response;
        console.log(response);
      })
      .catch(erro => {
        console.log(erro);
      })
      .finally(() => {
        this.atualizarDados();
        this.isLoading = false;
      })
  }

  atualizarDados() {
    this.Agendamentos_exibidos = this.Agendamentos.filter((agendamento) => {
      return agendamento.data.includes(this.hoje);
    });
  }

  ngOnInit() {

  }
  AddForm!: FormGroup;
  modalOpenAdd = false;
  submit_add() {
    console.log(this.AddForm.value)
    if (this.AddForm.invalid) {
      console.log('Formulario De Adição Invalido')
      this.message = 'Falha ao agendar!!'
      this.ExibirMessage(false);
      return;
    }
    console.log('Formulario De Adição Valido')
    this.message = 'Agendado com sucesso!!'
    this.ExibirMessage(true);
  }
  setOpenAdd(isOpen: any) {
    if (isOpen == true) {
      this.modalOpenAdd = isOpen;
      this.createFormAdd();
      setTimeout(() => {
        this.fakeCalendario = document.querySelector('#fakeCalendario') as HTMLInputElement;
        console.log(this.fakeCalendario)
      }, 1)
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
      this.message = 'Falha ao alterar!!'
      this.ExibirMessage(false);
      return;
    }
    console.log('Formulario De Edição Valido')
    this.message = 'Alterado com sucesso!!'
    this.ExibirMessage(true);
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
      if (agendamento.cliente.includes(value.toLocaleLowerCase()) == true) {
        estado = true;
      }
      return agendamento.cliente.includes(value.toLocaleLowerCase());
    });
    this.verificarEstado(estado);
  }

  verificarEstado(estado: boolean) {
    if (!estado) {
      setTimeout(() => {
        this.atualizarDados();
        this.diaValido = true;
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
  }



}
