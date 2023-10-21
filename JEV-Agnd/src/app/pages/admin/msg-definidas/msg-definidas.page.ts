import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Mensagem } from 'src/app/models/mensagem';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { MsgDefinidasService } from 'src/app/services/mensagens/msg-definidas.service';
import { style } from '@angular/animations';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import { Clientes } from 'src/app/models/clientes';

@Component({
 selector: 'app-msg-definidas',
 templateUrl: './msg-definidas.page.html',
 styleUrls: ['./msg-definidas.page.scss'],
})
export class MsgDefinidasPage implements OnInit {

 mensagens: Mensagem[] = [];
 mensagensExibidas: Mensagem[] = [];
 clientes: Clientes[] = [];

 constructor(private msgDefinidasService: MsgDefinidasService, private clienteService: ClientesService) {
  this.list_mensagens();
  this.create_message();
  this.list_clientes();
 }

 list_clientes() {
  this.clienteService.list().subscribe((dados: any) => {
   this.clientes = dados.clientes;
  });
 }

 list_mensagens() {
  this.msgDefinidasService.list().subscribe((dados: any) => {
   this.mensagens = dados.mensagens;
   if (!dados.success || dados.success != 1) {
    this.mensagens = [];
   }
   console.log(this.mensagens)
  })
 }

 create_message() {
  console.log('criando mensagem')
  this.mensagensExibidas = [];
  this.createFormAdd();
 }

 mensagemSelecionada: String = '';
 numeroTelefone: String = '';
 select_message(id: any) {
  this.mensagensExibidas = this.mensagens.filter((element: any) => element.id_mensagem == id);
  this.mensagemSelecionada = this.mensagensExibidas[0].descricao;
  this.createFormAdd();
  console.log(this.mensagensExibidas);
 }
 cor = '#fff'

 AddForm!: FormGroup;
 createFormAdd() {
  this.AddForm = new FormGroup({
   cor: new FormControl(this.mensagensExibidas[0]?.cor ? this.mensagensExibidas[0]?.cor : '', Validators.compose([
    Validators.required])),
   titulo: new FormControl(this.mensagensExibidas[0]?.titulo ? this.mensagensExibidas[0]?.titulo : '', Validators.compose([
    Validators.required])),
   descricao: new FormControl(this.mensagensExibidas[0]?.descricao ? this.mensagensExibidas[0]?.descricao : '', Validators.compose([
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

 submit_add() {
  console.log(this.AddForm.value)
  if (this.AddForm.valid) {

   let mensagem = {
    titulo: this.AddForm.value.titulo,
    descricao: this.AddForm.value.descricao,
    cor: this.AddForm.value.cor,
   }

   console.log(mensagem);

   this.msgDefinidasService.create(mensagem).subscribe(() => {
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

 MensagensModal: boolean = false;
 openMensagensModal(isOpen: boolean) {
  this.MensagensModal = isOpen;
 }

 ngOnInit() {
 }

 modalEnviarMensagem: boolean = false;
 setOpenEnviarMensagem(isOpen: boolean) {
  this.modalEnviarMensagem = isOpen;
 }
 enviarMensagem(telefone: String) {
  console.log(telefone)
  console.log(this.mensagemSelecionada)
  window.open(this.whatsappUrl(telefone, this.mensagemSelecionada));
 }

 whatsappUrl(telefone: String, mensagem: any): string {
  const base = 'https://api.whatsapp.com/send';
  const url = `${base}?phone=${telefone}&text=${encodeURIComponent(mensagem)}`;
  return url;
 }
}

