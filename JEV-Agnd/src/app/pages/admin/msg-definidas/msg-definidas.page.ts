import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import { Mensagem } from 'src/app/models/mensagem';
import { MsgDefinidasService } from 'src/app/services/mensagens/msg-definidas.service';

@Component({
  selector: 'app-msg-definidas',
  templateUrl: './msg-definidas.page.html',
  styleUrls: ['./msg-definidas.page.scss'],
})
export class MsgDefinidasPage implements OnInit {

  mensagens: Mensagem[] = [
    {
      tipo: 'confirmacao',
      descricao: 'Digite uma mensagem de confirmação'
    },
    {
      tipo: 'reagendamento',
      descricao: 'Digite uma mensagem de reagendamento'
    },
    {
      tipo: 'cobranca',
      descricao: 'Digite uma mensagem de cobrança'
    },
    {
      tipo: 'cancelamento',
      descricao: 'Digite uma mensagem de cancelamento'
    }
  ];

  constructor(private msgDefinidasService: MsgDefinidasService) {
    this.list_mensagens()
    this.create_mensagens()
    this.update_mensagens()
  }

  ngOnInit() { }


  create_mensagens() {

  }
  update_mensagens() {

  }

  numeroTelefone = '15988360435'; // Número de telefone no formato internacional
  mensagem = 'Olá, mundo!'; // Sua mensagem

  whatsappUrl(): string {
    const base = 'https://api.whatsapp.com/send';
    const url = `${base}?phone=${this.numeroTelefone}&text=${encodeURIComponent(this.mensagem)}`;
    return url;
  }

  // window.open(this.whatsappUrl())

  compartilhar(mensagem: String) {
    console.log(mensagem)
  }

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


// separador

mensagensExibidas:Mensagem[] = [];


list_mensagens() {
  this.msgDefinidasService.list().subscribe((dados: any) => {
  //   console.log(dados.mensagens)
  //   dados.mensagens.forEach((element: any) => {
  //     let mensagem = this.mensagens.find((mensagem: any) => mensagem.tipo == element.tipo)
  //     if (mensagem) {
  //       this.mensagens[this.mensagens.indexOf(mensagem)].descricao = element.descricao;
  //     }
  //   });
  })
}

select_message(){

}


  mensagemSelecionada: any = 0;





  cards: any[] = [
    {
      title: 'Confirmação',
      content: 'Conteúdo do Confirmação',
      color: '#000000'
    },
    {
      title: 'Cancelamento',
      content: 'Conteúdo do Cancelamento'
    },
    {
      title: 'Reagendamento',
      content: 'Conteúdo do Reagendamento'
    },
    {
      title: 'Cobrança',
      content: 'Conteúdo do Cobrança'
    }
  ];

  redirect_add(){
    console.log(this.cards);
    this.mensagemSelecionada = 1
  }

  redirect_message(){
    console.log('abc');
  }

  submit_add(){
    console.log(this.cards);
  }

}