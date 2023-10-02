import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Servicos } from 'src/app/models/servico';
import { ServicosService } from 'src/app/services/servicos/servicos.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
})
export class ServicosPage implements OnInit {
  ngOnInit(): void { }
  @Input() Card_Dados: Servicos[] = [];
  CardDados: Servicos[] = [];

  constructor(private servicoService: ServicosService) {
    this.listServicos();
  }

  listServicos() {
    this.servicoService.list().subscribe((dados: any) => {
      this.CardDados = dados.servicos;
      if (!dados.success || dados.success != 1) {
        this.CardDados = [];
      }
    })
  }

  AddForm!: FormGroup;
  modalOpenAdd = false;
  modalCloseAdd = false;
  async createHandler(event: any) {
    if (this.AddForm.invalid) {
      return;
    }

    console.log('Deus é fiel!!!');
    const formData = new FormData();

    formData.append("titulo", this.AddForm.value.titulo);
    formData.append("descricao", this.AddForm.value.descricao);
    formData.append("duracao", this.AddForm.value.duracao);
    formData.append("preco", this.AddForm.value.preco);
  }
  createFormAdd() {
    this.AddForm = new FormGroup({
      id: new FormControl(''),
      titulo: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      duracao: new FormControl('', [Validators.required]),
      preco: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ]))
    });
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
      console.log('Formulario De Adição Invalido')
      return;
    }
    console.log('Formulario De Adição Concluído')
    this.CardDados.push({
      titulo_servico: this.AddForm.value.titulo,
      desc_servico: this.AddForm.value.descricao,
      duracao_servico: this.AddForm.value.duracao,
      preco_servico: this.AddForm.value.preco,
    });
  }
  setOpenAdd(isOpen: any) {
    if (isOpen == true || this.AddForm.invalid && isOpen == false || this.AddForm.valid && isOpen == false) {
      this.modalCloseAdd = !isOpen;
      this.modalOpenAdd = isOpen;
    }

    if (isOpen == true) {
      this.createFormAdd()
    }
  }

  EditForm!: FormGroup;
  editFormValue: any = [];
  modalOpenEdit = false;
  modalCloseEdit = false;
  createFormEdit() {
    this.EditForm = new FormGroup({
      id_edit: new FormControl(this.editFormValue ? this.editFormValue[0].idCard : ''),
      titulo_edit: new FormControl(this.editFormValue ? this.editFormValue[0].tituloCard : '', [Validators.required]),
      descricao_edit: new FormControl(this.editFormValue ? this.editFormValue[0].descricaoCard : '', [Validators.required]),
      duracao_edit: new FormControl(this.editFormValue ? this.editFormValue[0].duracaoCard : '', [Validators.required]),
      preco_edit: new FormControl(this.editFormValue ? this.editFormValue[0].precoCard : '', [Validators.required])
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
  submit_edit() {
    if (this.EditForm.invalid) {
      console.log('Formulario De Edição Invalido')
      return;
    }
    console.log('Formulario De Edição Concluído')
    this.CardDados[this.EditForm.value.id_edit] = {
      titulo_servico: this.EditForm.value.titulo_edit,
      desc_servico: this.EditForm.value.descricao_edit,
      duracao_servico: this.EditForm.value.duracao_edit,
      preco_servico: this.EditForm.value.preco_edit,
    };
  }
  setOpenEdit(isOpen: any) {
    if (isOpen == true || this.EditForm.invalid && isOpen == false || this.EditForm.valid && isOpen == false) {
      this.modalCloseEdit = !isOpen;
      this.modalOpenEdit = isOpen;
    }
  }
  editService(indice: any) {
    this.editFormValue = [
      {
        idCard: indice,
        tituloCard: this.CardDados[indice].titulo_servico,
        descricaoCard: this.CardDados[indice].desc_servico,
        duracaoCard: this.CardDados[indice].duracao_servico,
        precoCard: this.CardDados[indice].preco_servico,
      }
    ];

    this.createFormEdit();
    this.setOpenEdit(true);
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
      this.servicoService.delete(this.indiceDel).subscribe(() => {
        this.CardDados = this.CardDados.filter((servicos: any) => servicos.id_servico !== this.indiceDel);
        console.log(this.CardDados)
      });
    }
  }

}
