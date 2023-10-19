import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Servicos } from 'src/app/models/servico';
import { ServicosService } from 'src/app/services/servicos/servicos.service';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import decimalMask from '../../../masks/decimalMask'

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
})
export class ServicosPage implements OnInit {
  ngOnInit(): void { }
  @Input() Card_Dados: Servicos[] = [];
  Servicos: Servicos[] = [];
  Servicos_exibidos: Servicos[] = [];
  isLoading: boolean = false;

  constructor(private servicoService: ServicosService) {
    this.listServicos();
  }

  listServicos() {
    this.isLoading = true;
    this.servicoService.list().subscribe((dados: any) => {
        this.isLoading = false;
        this.Servicos = dados.servicos;
        if (!dados.success || dados.success != 1) {
          this.Servicos = [];
        }
        this.Servicos_exibidos = this.Servicos;
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
      preco: new FormControl('', [Validators.required,])
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
    if (this.AddForm.valid) {
      console.log(this.AddForm.value)
      let servico = []
      servico[0] = {
        titulo: this.AddForm.value.titulo.toLocaleLowerCase(),
        descricao: this.AddForm.value.descricao,
        duracao: this.AddForm.value.duracao,
        preco: this.AddForm.value.preco.replace('R$', '').replace(/\s/g, '')
      }
      this.servicoService.create(servico).subscribe(() => {
        this.listServicos();
      })
    }

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
  async createHandlerEdit(event: any) {
    if (this.EditForm.invalid) {
      return;
    }

    console.log('Deus é fiel!!!');
    const formData = new FormData();

    formData.append("titulo", this.EditForm.value.titulo_edit);
    formData.append("descricao", this.EditForm.value.descricao_edit);
    formData.append("duracao", this.EditForm.value.duracao_edit);
    formData.append("preco", this.EditForm.value.preco_edit);
  }

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

    if (this.EditForm.valid) {
      // console.log(this.EditForm.value)
      let servico = []
      servico[0] = {
        id: this.EditForm.value.id_edit,
        titulo: this.EditForm.value.titulo_edit.toLocaleLowerCase(),
        descricao: this.EditForm.value.descricao_edit,
        duracao: this.EditForm.value.duracao_edit,
        preco: this.EditForm.value.preco_edit.replace('R$', '').replace(/\s/g, '')
      }
      console.log(servico[0]);
      this.servicoService.update(servico).subscribe(() => {
        this.listServicos();
      })
    }

    // if (this.EditForm.invalid) {
    //   console.log('Formulario De Edição Invalido')
    //   return;
    // }
    // console.log('Formulario De Edição Concluído')
    // this.Servicos[this.EditForm.value.id_edit] = {
    //   titulo_servico: this.EditForm.value.titulo_edit,
    //   desc_servico: this.EditForm.value.descricao_edit,
    //   duracao_servico: this.EditForm.value.duracao_edit,
    //   preco_servico: this.EditForm.value.preco_edit,
    // };
  }
  setOpenEdit(isOpen: any) {
    if (isOpen == true || this.EditForm.invalid && isOpen == false || this.EditForm.valid && isOpen == false) {
      this.modalCloseEdit = !isOpen;
      this.modalOpenEdit = isOpen;
    }
  }
  editService(indice: any) {
    this.Servicos.forEach(Element => {
      if (indice == Element.id_servico) {
        this.editFormValue = [
          {
            idCard: indice,
            tituloCard: Element.titulo_servico,
            descricaoCard: Element.desc_servico,
            duracaoCard: Element.duracao_servico,
            precoCard: Element.preco_servico,
          }
        ];
      }
    })

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
        this.Servicos = this.Servicos.filter((servico: any) => servico.id_servico !== this.indiceDel);
        this.Servicos_exibidos = this.Servicos;
      });
    }
  }

  filterServicoTitle(e: Event) {
    let estado: boolean = false;
    const target = e.target as HTMLInputElement;
    const value = target.value;
    // console.log(value)

    this.Servicos_exibidos = this.Servicos.filter((servico) => {
      if (servico.titulo_servico.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
        estado = true;
      }
      console.log(value)
      return servico.titulo_servico.toLocaleLowerCase().includes(value.toLocaleLowerCase());
    });
    this.verificarEstado(estado);
  }

  verificarEstado(estado: any) {
    if (!estado) {
      setTimeout(() => {
        this.Servicos_exibidos = this.Servicos
      }, 1000)
    }
  }

  readonly decimalMask: MaskitoOptions = decimalMask;
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();
}
