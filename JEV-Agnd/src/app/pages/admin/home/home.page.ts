import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() { }

  Agendamentos: any[] = [
    {
      status: 'Confirmado',
      horarioInicio: '9:00', horarioFim: '10:30',
      cliente: 'Laura Peneira',
      servico: 'Cabelo, Manicure, Pedicure',
      metodoPagamento: 'Pix',
      preco: '150.00',
      data: '2023-09-28'
    },
    {
      status: 'Esperando confirmação',
      horarioInicio: '11:00', horarioFim: '12:30',
      cliente: 'Josefina Chapéu',
      servico: 'Cabelo',
      metodoPagamento: 'Dinheiro',
      preco: '50.00',
      data: '2023-09-30'
    },
    {
      status: 'Esperando confirmação',
      horarioInicio: '14:20', horarioFim: '15:20',
      cliente: 'Claudinha Buxexa',
      servico: 'Manicure, Pedicure',
      metodoPagamento: 'Débito',
      preco: '100.00',
      data: '2023-09-29'
    },
  ]

  Agendamentos_exibidos: any[] = this.Agendamentos;

  ngOnInit() {

  }

  modalOpenDelete = false;
  modalOpenAdd = false;
  modalOpenEdit = true;

  setOpenDelete(isOpen: any) {
    this.modalOpenDelete = isOpen;
  }
  setOpenAdd(isOpen: any) {
    this.modalOpenAdd = isOpen;
  }
  setOpenEdit(isOpen: any) {
    this.modalOpenEdit = isOpen;
  }

  console(texto: string) {
    console.log(texto);
  }

  handlerMessage = '';
  roleMessage = '';

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        this.handlerMessage = 'Alert canceled';
      },
    },
    {
      text: 'Sim',
      role: 'confirm',
      handler: () => {
        this.handlerMessage = 'Alert confirmed';
      },
    },
  ];

  setResult(ev: any) {
    this.roleMessage = `Dismissed with role: ${ev.detail.role}`;
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
}
