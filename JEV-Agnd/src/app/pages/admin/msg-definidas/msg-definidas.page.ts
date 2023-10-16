import { style } from '@angular/animations';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import { Mensagem } from 'src/app/models/mensagem';
import { MsgDefinidasService } from 'src/app/services/mensagens/msg-definidas.service';

@Component({
  selector: 'app-msg-definidas',
  templateUrl:'./msg-definidas.page.html',
  styleUrls: ['./msg-definidas.page.scss'],
})
export class MsgDefinidasPage implements OnInit {  

  constructor(private msgDefinidasService: MsgDefinidasService) {
    this.list_mensagens()
    // this.create_mensagens()
    // this.update_mensagens()
  }

  ngOnInit() {
    this.list_mensagens();
  }


  // create_mensagens() {

  // }
  // update_mensagens() {

  // }

  // numeroTelefone = '15988360435'; // Número de telefone no formato internacional
  // mensagem = 'Olá, mundo!'; // Sua mensagem

  // whatsappUrl(): string {
  //   const base = 'https://api.whatsapp.com/send';
  //   const url = `${base}?phone=${this.numeroTelefone}&text=${encodeURIComponent(this.mensagem)}`;
  //   return url;
  // }

  // // window.open(this.whatsappUrl())

  // compartilhar(mensagem: String) {
  //   console.log(mensagem)
  // }

  // modalOpenConfirm = false;
  // setOpenConfirm(isOpenConfirm: boolean) {
  //   this.modalOpenConfirm = isOpenConfirm;
  // }
  // modalOpenReagen = false;
  // setOpenReagen(isOpenReagen: boolean) {
  //   this.modalOpenReagen = isOpenReagen;
  // }
  // modalOpenCancel = false;
  // setOpenCancel(isOpenCancel: boolean) {
  //   this.modalOpenCancel = isOpenCancel;
  // }
  // modalOpenCobrar = false;
  // setOpenCobrar(isOpenCobrar: boolean) {
  //   this.modalOpenCobrar = isOpenCobrar;
  // }


// separador

Mensagens: Mensagem[] = [];
mensagensExibidas: Mensagem[] = [];


list_mensagens() {
  this.msgDefinidasService.list().subscribe((dados:any) => {
    this.Mensagens = dados.mensagens;
    console.log(this.Mensagens);
    console.log(dados.mensagens);
        if (!dados.success || dados.success != 1) {
          this.Mensagens = [];
        }
        this.mensagensExibidas = this.Mensagens;
  })
  console.log(this.Mensagens);


  // console.log(this.Mensagens);
}

select_message(){

}


  mensagemSelecionada: any = 0;


  redirect_add(){
    this.mensagemSelecionada = 1
    this.createFormAdd();
  }

  redirect_message(){
    console.log('card');
  }

  // criando mensagens novas
  AddForm!: FormGroup;
  createFormAdd() {
    this.AddForm = new FormGroup({
      cor: new FormControl('', Validators.compose([
        Validators.required])),
      titulo: new FormControl('', Validators.compose([
        Validators.required])),
      descricao: new FormControl('', Validators.compose([
        Validators.required]))
    });
  }

  get cor_add() {
    return this.AddForm.get('cor')!;
  }
  get titulo_add() {
    return this.AddForm.get('titulo')!;
  }
  get descricao_add() {
    return this.AddForm.get('descricao')!;
  }

  submit_add(){
    console.log(this.AddForm.value)
    if (this.AddForm.valid) {
      let mensagem = [];

      mensagem[0] = {
        cor: this.AddForm.value.cor,
        titulo: this.AddForm.value.titulo,
        descricao: this.AddForm.value.descricao,
      }

      console.log(mensagem);

      this.msgDefinidasService.create(this.AddForm.value).subscribe(() => {
        this.list_mensagens();
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

}

