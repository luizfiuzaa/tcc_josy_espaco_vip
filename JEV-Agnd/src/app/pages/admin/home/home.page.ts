import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Agendamentos } from 'src/app/models/agendamentos';
import { Clientes } from 'src/app/models/clientes';
import { Servicos } from 'src/app/models/servico';
import { AgendamentosService } from 'src/app/services/agendamentos/agendamentos.service';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { ServicosService } from 'src/app/services/servicos/servicos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  agendamento: any;
  // Iniciando a service no constructor
  constructor(private agendamentosService: AgendamentosService, private clientesSercice: ClientesService, private servicosSercice: ServicosService) {
    this.getAgendamentos();
    this.getClientes();
    this.getServicos();
  }
  // Executa após o carregamento da página
  ngAfterViewInit() {
    this.toast = document.querySelector('#message') as HTMLElement;
  }
  Agendamentos: Agendamentos[] = []
  Clientes: Clientes[] = []
  Servicos: Servicos[] = []
  Agendamentos_exibidos: Agendamentos[] = this.Agendamentos;
  isLoading = false;
  // Pega os dados da API
  getAgendamentos() {
    this.isLoading = true;
    this.agendamentosService.list().subscribe((dados: any) => {
      this.isLoading = false;
      this.Agendamentos = dados.agendamentos;
      if(!dados.success || dados.success != 1){
        this.Agendamentos = [];
      }
      this.atualizarDados();
    })
  }
  // Pega os dados da API
  getClientes() {
    this.clientesSercice.list().subscribe((dados: any) => {
      this.Clientes = dados.clientes;
      if(!dados.success || dados.success != 1){
        this.Clientes = [];
      }
    })
  }
  // Pega os dados da API
  getServicos() {
    this.servicosSercice.list().subscribe((dados: any) => {
      this.Servicos = dados.servicos;
      if(!dados.success || dados.success != 1){
        this.Servicos = [];
      }
    })
  }
  // Atualiza os agendametnos do dia de hoje
  atualizarDados() {
    this.Agendamentos_exibidos = this.Agendamentos.filter((agendamento) => {
      return agendamento.data_agend.includes(this.hoje);
    });
  }

  date = new Date();
  hoje = String(this.date.getFullYear() + '-' + String(this.date.getMonth() + 1).padStart(2, '0') + '-' + this.date.getDate()).padStart(2, '0');
  diaValido: boolean = true;
  cores = [['white', '#FF0361'], ['white', '#df4980'], ['white', '#ec84ab']]

  filterDate(e: Event) {
    this.open_calendario(false);
    let estado: boolean = false;
    let value = ((e.target as HTMLInputElement).value).split('T');
    let diaBuscado = new Date(value[0].replace("-", ", "));
    let hoje = new Date(this.hoje);

    this.Agendamentos_exibidos = this.Agendamentos.filter((agendamento) => {
      if (diaBuscado < hoje) {
        this.diaValido = false;
        this.verificarEstado(estado);
        return;
      }
      if (agendamento.data_agend.includes(value[0])) {
        estado = true;
      }
      return agendamento.data_agend.includes(value[0]);
    });
  }
  highlightedDates: any[] = [];
  diasAgendados() {
    this.highlightedDates = [];
    let datas: any[] = [];
    let datasFrequencia: any[] = [];
    this.Agendamentos.forEach(element => {
      let data = new Date(element.data_agend);
      if (this.date <= data) { datas.push(element.data_agend) }
    });
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
    });
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
      } else if (element.datafrequencia == media) {
        this.highlightedDates.push({
          date: element.data,
          textColor: this.cores[1][0],
          backgroundColor: this.cores[1][1],
        });
      } else if (element.datafrequencia < media) {
        this.highlightedDates.push({
          date: element.data,
          textColor: this.cores[2][0],
          backgroundColor: this.cores[2][1],
        });
      }
    })
  }
  calendario_open: boolean = false;
  open_calendario(isOpen: boolean) {
    this.calendario_open = isOpen;
    if (isOpen) {
      this.diasAgendados();
    }
  }
  // Form de adição
  myDate: String = new Date().toISOString();
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
    this.agendamentosService.create(this.AddForm.value).subscribe(()=>{
      this.getAgendamentos();
    })
  }
  // Modal de edição
  modalOpenAdd = false;
  setOpenAdd(isOpen: any) {
    if (isOpen == true) {
      this.modalOpenAdd = isOpen;
      this.createFormAdd();
      setTimeout(() => {
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
      calendario: new FormControl('', [Validators.required]),
      servicos: new FormControl('', [Validators.required]),
      formaDePagamento: new FormControl('', [Validators.required])
    });
  }
  get cliente_edit() {
    return this.EditForm.get('cliente')!;
  }
  get calendario_edit() {
    return this.AddForm.get('calendario')!;
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
  indiceEdit:any; 
  EditAgendamento(indice: any){
    this.indiceEdit = indice;
    this.setOpenEdit(true);
  }
  // Modal de Edição
  modalOpenEdit = false;
  setOpenEdit(isOpen: any) {
    this.agendamento = this.Agendamentos[this.indiceEdit];
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
  indiceDel: any;
  apagarService(indice: any) {
    this.indiceDel = indice;
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
      this.agendamentosService.delete(this.indiceDel).subscribe(() => {
        this.Agendamentos = this.Agendamentos.filter((agendamento: any) => agendamento.id_agendamento !== this.indiceDel);
        console.log(this.Agendamentos);
        this.Agendamentos_exibidos = this.Agendamentos_exibidos.filter((agendamento: any) => agendamento.id_agendamento   !== this.indiceDel);
        console.log(this.Agendamentos_exibidos);
      })
    }
  }

  // Filtro por nome de clientes
  search(e: Event): void {
    let estado: boolean = false;
    const target = e.target as HTMLInputElement;
    const value = target.value;
    this.Agendamentos_exibidos = this.Agendamentos.filter((agendamento) => {
      if (agendamento.cli_agendamento.includes(value.toLocaleLowerCase())) {
        estado = true;
      }
      if (!value) {
        estado = false;
      }
      return agendamento.cli_agendamento.includes(value.toLocaleLowerCase());
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
    return utcDay !== 0 && utcDay !== 1;
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
