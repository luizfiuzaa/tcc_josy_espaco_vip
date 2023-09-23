import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  ngOnInit(): void { }
  @Input() Card_Dados: CardDados[] = [];
  CardDados: any[] = [
    {
      tituloCard: 'Unhas',
      descricaoCard: 'Um ótimo serviço para quem tem dinheiro, e vontade de ficar lindo.',
      duracaoCard: '60',
      precoCard: '34.00',
    },
    {
      tituloCard: 'Cabelo',
      descricaoCard: 'Um ótimo serviço para quem tem dinheiro, e vontade de ficar lindo.',
      duracaoCard: '120',
      precoCard: '40.00',
    },
    {
      tituloCard: 'Sombrancelhas',
      descricaoCard: 'Um ótimo serviço para quem tem dinheiro, e vontade de ficar lindo.',
      duracaoCard: '30',
      precoCard: '30.00',
    },
    {
      tituloCard: 'Sombrancelhas',
      descricaoCard: 'Um ótimo serviço para quem tem dinheiro, e vontade de ficar lindo.',
      duracaoCard: '30',
      precoCard: '30.00',
    },
    {
      tituloCard: 'Sombrancelhas',
      descricaoCard: 'Um ótimo serviço para quem tem dinheiro, e vontade de ficar lindo.',
      duracaoCard: '30',
      precoCard: '30.00',
    },
    {
      tituloCard: 'Pés',
      descricaoCard: 'Um ótimo serviço para quem tem dinheiro, e vontade de ficar lindo.',
      duracaoCard: '60',
      precoCard: '35.00',
    }
  ];

  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/servicos`;

  constructor(private http: HttpClient) { }
  createServico(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
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

    this.createServico(formData).subscribe();
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
      tituloCard: this.AddForm.value.titulo,
      descricaoCard: this.AddForm.value.descricao,
      duracaoCard: this.AddForm.value.duracao,
      precoCard: this.AddForm.value.preco,
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
      tituloCard: this.EditForm.value.titulo_edit,
      descricaoCard: this.EditForm.value.descricao_edit,
      duracaoCard: this.EditForm.value.duracao_edit,
      precoCard: this.EditForm.value.preco_edit,
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
        tituloCard: this.CardDados[indice].tituloCard,
        descricaoCard: this.CardDados[indice].descricaoCard,
        duracaoCard: this.CardDados[indice].duracaoCard,
        precoCard: this.CardDados[indice].precoCard,
      }
    ];

    this.createFormEdit();
    this.setOpenEdit(true);
  }
  apagarService(indice: any){
    this.CardDados.splice(indice, 1)
  }
}
