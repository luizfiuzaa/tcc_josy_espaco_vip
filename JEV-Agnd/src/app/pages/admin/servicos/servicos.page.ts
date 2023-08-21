import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface CardDados {
  tituloCard: string;
  descricaoCard: string;
  duracaoCard: string;
  precoCard: string;
}

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
})
export class ServicosPage implements OnInit {

  @Input() Card_Dados: CardDados[] = [];
  CardDados: any[] = [
    {
      tituloCard: 'Unhas',
      descricaoCard: 'Um ótimo serviço para quem tem dinheiro, e vontade de ficar lindo.',
      duracaoCard: '1h',
      precoCard: '34.00',
    },
    {
      tituloCard: 'Cabelo',
      descricaoCard: 'Um ótimo serviço para quem tem dinheiro, e vontade de ficar lindo.',
      duracaoCard: '2h',
      precoCard: '40.00',
    },
    {
      tituloCard: 'Sombrancelhas',
      descricaoCard: 'Um ótimo serviço para quem tem dinheiro, e vontade de ficar lindo.',
      duracaoCard: '30mins',
      precoCard: '30.00',
    },
    {
      tituloCard: 'Sombrancelhas',
      descricaoCard: 'Um ótimo serviço para quem tem dinheiro, e vontade de ficar lindo.',
      duracaoCard: '30mins',
      precoCard: '30.00',
    },
    {
      tituloCard: 'Sombrancelhas',
      descricaoCard: 'Um ótimo serviço para quem tem dinheiro, e vontade de ficar lindo.',
      duracaoCard: '30mins',
      precoCard: '30.00',
    },
    {
      tituloCard: 'Pés',
      descricaoCard: 'Um ótimo serviço para quem tem dinheiro, e vontade de ficar lindo.',
      duracaoCard: '1h',
      precoCard: '35.00',
    }
  ];

  AddForm!: FormGroup;
  EditForm!: FormGroup;

  modalOpenAdd = false;
  modalOpenEdit = false;
  index: any = ''

  ngOnInit(): void {
    this.AddForm = new FormGroup({
      id: new FormControl(''),
      titulo: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      duracao: new FormControl('', [Validators.required]),
      preco: new FormControl('', [Validators.required])
    });
    this.EditForm = new FormGroup({
      id_edit: new FormControl(''),
      titulo_edit: new FormControl('', [Validators.required]),
      descricao_edit: new FormControl('', [Validators.required]),
      duracao_edit: new FormControl('', [Validators.required]),
      preco_edit: new FormControl('', [Validators.required])
    });
  }

  get titulo_edit() {
    return this.EditForm.get('titulo_edit')!;
  }
  get descricao_edit() {
    return this.EditForm.get('descricao_edit')!;
  }
  get duracao_edit() {
    return this.EditForm.get('duracao_edit')!;
  }
  get preco_edit() {
    return this.EditForm.get('preco_edit')!;
  }

  get titulo() {
    return this.AddForm.get('titulo')!;
  }
  get descricao() {
    return this.AddForm.get('descricao')!;
  }
  get duracao() {
    return this.AddForm.get('duracao')!;
  }
  get preco() {
    return this.AddForm.get('preco')!;
  }

  submit_add() {
    if (this.AddForm.invalid) {
      return;
    }
    console.log(this.AddForm.value);
  }
  submit_edit() {
    if (this.EditForm.invalid) {
      return;
    }
    console.log(this.EditForm.value);
  }

  setOpenAdd(isOpen: any) {
    this.modalOpenAdd = isOpen;
  }

  setOpenEdit(isOpen: any) {
    this.modalOpenEdit = isOpen;
  }
  editService(indice: any) {
    this.index = indice;
    this.setOpenEdit(true);
  }
}
