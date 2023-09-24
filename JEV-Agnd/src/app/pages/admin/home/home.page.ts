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
  // Iniciando a service no constructor
  constructor(private agendamentosService: AgendamentosService) {
    this.getAgendamentos();
  }
  // Executa após o carregamento da página
  ngAfterViewInit() {
    this.toast = document.querySelector('#message') as HTMLElement;
  }

  Agendamentos: Agendamentos[] = []
  Agendamentos_exibidos: Agendamentos[] = this.Agendamentos;
  isLoading = false;
  // Pega os dados da API
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
  // Atualiza os agendametnos do dia de hoje
  atualizarDados() {
    this.Agendamentos_exibidos = this.Agendamentos.filter((agendamento) => {
      return agendamento.data.includes(this.hoje);
    });
  }

  date = new Date();
  hoje = String(this.date.getFullYear() + '-' + String(this.date.getMonth() + 1).padStart(2, '0') + '-' + this.date.getDate()).padStart(2, '0');
  diaValido: boolean = true;
  cores = [['white', '#FF0361'], ['white', '#df4980'], ['white', '#ec84ab']]

  getData(e: Event) {
    let target = e.target as HTMLInputElement
    let value = target.value;
    let valueArray = value.split('T')
    this.fakeCalendario.value = `${valueArray[0]} ${valueArray[1]}`;
  }

  filterDate(e: Event) {
    this.open_calendario(false);

    let estado: boolean = false;
    let target = e.target as HTMLInputElement
    let value = target.value;
    let valueArray = value.split('T')
    let diaBuscado = new Date(valueArray[0]);
    let hoje = new Date(this.hoje);
    console.log(valueArray[0]);
    console.log(hoje);
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
    let datas: any[] = [];
    let datasFrequencia: any[] = [];

    this.Agendamentos.forEach(element => {
      let data = new Date(element.data);
      if (this.date > data) { } else {
        datas.push(element.data)
      }
    });
    console.log(datas)

    let media = datas.length;

    datas.forEach(() => {
      if (datas.length >= 1) {
        let frequencia = [];
        frequencia = datas.filter(data => data == datas[0]);
        datasFrequencia.push({
          data: datas[0],
          datafrequencia: frequencia.length
        })
        datas = datas.filter((element) => element != datas[0]);
      }
    })

    console.log(datas)
    this.colorirDias(datasFrequencia, media);
  }

  colorirDias(datas: any[], media: any) {
    media = Math.round(media / datas.length);
    datas.forEach((element) => {
      if (element.datafrequencia > media) {
        this.highlightedDates.push({
          date: element.data,
          textColor: this.cores[0][0],
          backgroundColor: this.cores[0][1],
        });
      }
      if (element.datafrequencia == media) {
        this.highlightedDates.push({
          date: element.data,
          textColor: this.cores[1][0],
          backgroundColor: this.cores[1][1],
        });
      }
      if (element.datafrequencia < media) {
        this.highlightedDates.push({
          date: element.data,
          textColor: this.cores[2][0],
          backgroundColor: this.cores[2][1],
        });
      }
    })
    console.log(datas)
    console.log(this.highlightedDates)
  }

  calendario_open: boolean = false;

  open_calendario(isOpen: boolean) {
    this.calendario_open = isOpen;
    if (isOpen == true) {
      this.diasAgendados();
    }
  }

  // Form de adição
  fakeCalendario: any
  AddForm!: FormGroup;
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

  // Modal de edição
  modalOpenAdd = false;
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

  // Form de edição
  EditForm!: FormGroup;

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

  // Modal de Edição
  modalOpenEdit = false;
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

  }

  // Filtro por nome de clientes
  search(e: Event): void {
    let estado: boolean = false;
    const target = e.target as HTMLInputElement;
    const value = target.value;
    this.Agendamentos_exibidos = this.Agendamentos.filter((agendamento) => {
      if (agendamento.cliente.includes(value.toLocaleLowerCase())) {
        estado = true;
      }
      if (!value) {
        estado = false;
      }
      return agendamento.cliente.includes(value.toLocaleLowerCase());
    });
    this.verificarEstado(estado);
  }
  // Reseta o agendamentos exibidos caso estado false
  verificarEstado(estado: boolean) {
    if (!estado) {
      setTimeout(() => {
        this.atualizarDados();
        this.diaValido = true;
      }, 1000)
    }
  }

  // Filtro de dias validos
  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return utcDay !== 0 && utcDay !== 6;
  }

  // Menssagem de aviso
  OpenToast: boolean = false;
  message: String = '';
  toast: any;
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
}
