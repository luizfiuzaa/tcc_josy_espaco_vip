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

  modalOpenConfirm = false;
  setOpenConfirm(isOpenConfirm: boolean) {
    this.modalOpenConfirm = isOpenConfirm;
  }
  modalOpenReagen = false;
  setOpenReagen(isOpenReagen: boolean) {
    this.modalOpenReagen = isOpenReagen;
  }
  modalOpenCancel = false;
  setOpenCancel(isOpenCancel: boolean) {
    this.modalOpenCancel = isOpenCancel;
  }
  modalOpenCobrar = false;
  setOpenCobrar(isOpenCobrar: boolean) {
    this.modalOpenCobrar = isOpenCobrar;
  }
}