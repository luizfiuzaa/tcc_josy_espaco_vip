import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';

@Component({
  selector: 'app-msg-definidas',
  templateUrl: './msg-definidas.page.html',
  styleUrls: ['./msg-definidas.page.scss'],
})
export class MsgDefinidasPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  Mensagens: any[] = [
    {
      titulo: 'Confirmação',
      texto: 'Texto de agendamento confirmado',
    },
    {
      titulo: 'Cancelamento',
      texto: 'Texto de agendamento confirmado',
    },
    {
      titulo: 'Reagendamento',
      texto: 'Texto de agendamento reagendamento',
    },
    {
      titulo: 'Cobrança',
      texto: 'Texto de agendamento cobrança',
    },
  ];

  modalOpen = false;
  setOpen(isOpen: boolean) {
    this.modalOpen = isOpen;
  }
}
