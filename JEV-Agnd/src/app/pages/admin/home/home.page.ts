import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Agendamentos } from 'src/app/models/agendamentos';
import { Clientes } from 'src/app/models/clientes';
import { Servicos } from 'src/app/models/servico';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { ServicosService } from 'src/app/services/servicos/servicos.service';
import { Comanda } from 'src/app/models/comanda';
import { AgendamentosService } from 'src/app/services/agendamentos/agendamentos.service';
import { Observable, map, startWith } from 'rxjs';
import numberMask from 'src/app/masks/numberMask';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';



@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
	Agendamentos: Agendamentos[] = []
	Clientes: Clientes[] = []
	Servicos: Servicos[] = []
	Servicos_comanda: Comanda[] = []
	Agendamentos_exibidos: Agendamentos[] = [];
	isLoading = false;

	controlClientes: any = '';
	options: Clientes[] = [];
	clientesFiltrados: Clientes[] = [];

	private _filter(cliente_nome: string): Clientes[] {
		const filterValue = cliente_nome.toLowerCase();
		return this.options.filter(option => option.cliente_nome.toLowerCase().includes(filterValue));
	}

	digitou(e: any) {
		this.controlClientes = (e.target as HTMLInputElement).value;
		this.clientesFiltrados = this._filter(this.controlClientes) ? this._filter(this.controlClientes) : this.options;
	}

	clienteSecionado(cliente: Clientes): string {
		return cliente && cliente.cliente_nome ? cliente.cliente_nome : '';
	}

	ngOnInit() {
		this.listAgendamentos(this.hoje);
		this.listClientes();
		this.listServicos();
		console.log('Jesus é santo ❤️🙌')
	}

	agendamento: any;
	// Iniciando a service no constructor
	constructor(private agendamentosService: AgendamentosService, private clientesSercice: ClientesService, private servicosSercice: ServicosService) { }

	// Executa após o carregamento da página
	ngAfterViewInit() {
		this.toast = document.querySelector('#message') as HTMLElement;
	}
	// Pega os dados da API
	listAgendamentos(filter: any) {
		this.isLoading = true;
		this.agendamentosService.list().subscribe((dados: any) => {
			this.isLoading = false;
			this.Agendamentos = dados.agendamentos.map((dados: any) => {
				var data: any = dados.data_agend.split("-");
				data = `${data[2]}/${data[1]}/${data[0]}`;
				return { ...dados, data_agend: data };
			});
			if (!dados.success || dados.success != 1) {
				this.Agendamentos = [];
			}

			this.Agendamentos_exibidos = this.Agendamentos;

			console.log(this.Agendamentos)
			console.log(this.Agendamentos_exibidos)
			this.atualizarDados(filter);
		})
	}
	// Pega os dados da API
	listClientes() {
		this.clientesSercice.list().subscribe((dados: any) => {
			this.Clientes = dados.clientes;
			if (!dados.success || dados.success != 1) {
				this.Clientes = [];
			}
			this.clientesFiltrados = this.options = this.Clientes;
		})
	}
	// Pega os dados da API
	listServicos() {
		this.servicosSercice.list().subscribe((dados: any) => {
			this.Servicos = dados.servicos;
			if (!dados.success || dados.success != 1) {
				this.Servicos = [];
			}
		})
	}
	// Atualiza os agendametnos do dia de hoje
	atualizarDados(filter: any) {
		this.Agendamentos_exibidos = this.Agendamentos.filter((agendamento) => {
			let data: any = agendamento.data_agend.split("/");
			data = `${data[2]}-${data[1]}-${data[0]}`;
			return data.includes(filter);
		});

		this.Agendamentos_exibidos = this.Agendamentos_exibidos.map((dados: any) => {
			let horario_inicio: any = dados.hora_inicio_agendamento.substr(0, 5);
			let horario_fim: any = dados.hora_fim_agendamento.substr(0, 5);
			return { ...dados, hora_inicio_agendamento: horario_inicio, hora_fim_agendamento: horario_fim };
		});
	}

	date = new Date();
	data_hoje = String(this.date.getFullYear() + '-' + String(this.date.getMonth() + 1).padStart(2, '0') + '-' + this.date.getDate()).padStart(2, '0');
	hojeArray = this.data_hoje.split('-');
	diaDeHoje = `${this.hojeArray[0]}-${this.hojeArray[1]}-0${this.hojeArray[2]}`
	hoje = this.data_hoje.length > 9 ? this.data_hoje : this.diaDeHoje;
	myDate: String = new Date(this.hoje).toISOString();
	dataFilter = `${this.hoje}T00:00:00`;
	diaValido: boolean = true;
	cores = [['white', '#FF0361'], ['white', '#df4980'], ['white', '#ec84ab']]

	filterDate(e: Event) {
		this.open_calendario(false);
		let estado: boolean = false;
		let value = ((e.target as HTMLInputElement).value).split('T');
		this.myDate = new Date(value[0]).toISOString();
		let diaBuscado = new Date(value[0].replace("-", ", "));
		let hoje = new Date(this.hoje);
		this.Agendamentos_exibidos = this.Agendamentos.filter((agendamento) => {
			if (diaBuscado < hoje) {
				this.diaValido = false;
				this.verificarEstado(estado);
				return;
			}
			let dataAgendameto: any = agendamento.data_agend.split("/");
			dataAgendameto = `${dataAgendameto[2]}-${dataAgendameto[1]}-${dataAgendameto[0]}`
			if (dataAgendameto.includes(value[0])) {
				estado = true;
				return dataAgendameto.includes(value[0]);
			}
		});
	}
	highlightedDates: any[] = [];
	diasAgendados() {
		this.highlightedDates = [];
		let datas: any[] = [];
		let datasFrequencia: any[] = [];
		this.Agendamentos.forEach(element => {
			let dataAgendameto: any = element.data_agend.split("/");
			dataAgendameto = `${dataAgendameto[2]}-${dataAgendameto[1]}-${dataAgendameto[0]}`;
			let data = new Date(dataAgendameto);
			if (this.date <= data) { datas.push(dataAgendameto) }
		});
		let media = datas.length;
		datas.forEach(() => {
			if (datas.length >= 1) {
				let frequencia = [];
				frequencia = datas.filter(data => data == datas[0]);
				datasFrequencia.push({
					data: datas[0],
					datafrequencia: frequencia.length
				})
				datas = datas.filter((element) => element != datas[0]);
			}
		});
		this.colorirDias(datasFrequencia, media);
	}
	colorirDias(datas: any[], media: any) {
		media = Math.round(media / datas.length);
		datas.forEach((element) => {
			if (element.datafrequencia > media) {
				this.highlightedDates.push({
					date: element.data,
					textColor: this.cores[0][0],
					backgroundColor: this.cores[0][1],
				});
			} else if (element.datafrequencia == media) {
				this.highlightedDates.push({
					date: element.data,
					textColor: this.cores[1][0],
					backgroundColor: this.cores[1][1],
				});
			} else if (element.datafrequencia < media) {
				this.highlightedDates.push({
					date: element.data,
					textColor: this.cores[2][0],
					backgroundColor: this.cores[2][1],
				});
			}
		})
	}
	calendario_open: boolean = false;
	open_calendario(isOpen: boolean) {
		this.calendario_open = isOpen;
		if (isOpen == true) {
			this.diasAgendados();
		}
	}
	// Form de adição
	AddForm!: FormGroup;
	createFormAdd() {
		this.precoAgend = '0.00';
		this.AddForm = new FormGroup({
			id: new FormControl(''),
			cliente: new FormControl(this.controlClientes, [Validators.required]),
			calendario: new FormControl('', [Validators.required]),
			servicos: new FormControl('', [Validators.required]),
			formaDePagamento: new FormControl('', [Validators.required]),

			// se repetir = true
			quantidade: new FormControl(''),
			intervalo: new FormControl(''),
		});
	}

	mostrarCondicionais = false;





	get cliente_add() {
		return this.AddForm.get('cliente')!;
	}
	get calendario_add() {
		return this.AddForm.get('calendario')!;
	}
	get servicos_add() {
		return this.AddForm.get('servicos')!;
	}
	get formaDePagamento_add() {
		return this.AddForm.get('formaDePagamento')!;
	}
	submit_add() {
		console.log(this.AddForm.value)
		if (this.AddForm.valid) {
			let dia_hora = ((this.AddForm.value.calendario).replace('.000Z', '')).split('T');
			let agendamento: any;

			if (this.mostrarCondicionais == false) {
				agendamento = {
					status_agendamento: 'e',
					hora_inicio_agendamento: dia_hora[1],
					cli_agendamento: this.AddForm.value.cliente.id_cliente,
					serv_agendamento: this.AddForm.value.servicos,
					metodo_de_pagamento: this.AddForm.value.formaDePagamento,
					preco_agend: this.precoAgend,
					data_agend: dia_hora[0],
				}

				this.agendamentosService.create(agendamento).subscribe((dados: any) => {
					if (dados.success == '1') {
						this.message = dados.message;
						this.setOpenAdd('submit');
						this.ExibirMessage(true);
						this.listAgendamentos(dia_hora[0]);
					} else {
						this.message = dados.message;
						this.ExibirMessage(false);
					}
				});
			}
			if (this.mostrarCondicionais == true) {
				let dataAgendamento = new Date(dia_hora[0]); // Converte a data para um objeto Date
			
				for (let i = 0; i < this.AddForm.value.quantidade; i++) {
					console.log("asd123");
			
					// Formate a data de agendamento no formato desejado
					const dataFormatada = dataAgendamento.toISOString().replace('.000Z', '').split('T')[0];
			
					agendamento = {
						status_agendamento: 'e',
						hora_inicio_agendamento: dia_hora[1],
						cli_agendamento: this.AddForm.value.cliente.id_cliente,
						serv_agendamento: this.AddForm.value.servicos,
						metodo_de_pagamento: this.AddForm.value.formaDePagamento,
						preco_agend: this.precoAgend,
						data_agend: dataFormatada, // Use a data formatada
					};
			
					// Adicione o intervalo (em dias) à data de agendamento
					dataAgendamento.setDate(dataAgendamento.getDate() + this.AddForm.value.intervalo);
					console.log(agendamento.data_agend);
			
					this.agendamentosService.create(agendamento).subscribe((dados: any) => {
						if (dados.success == '1') {
							this.message = dados.message;
							this.setOpenAdd('submit');
							this.ExibirMessage(true);
							this.listAgendamentos(dia_hora[0]);
						} else {
							this.message = dados.message;
							this.ExibirMessage(false);
						}
					});
				}
				return;
			}
			


			
		}
		this.message = 'Falha ao agendar... :('
		this.ExibirMessage(false);
	}
	// Modal de edição
	modalOpenAdd = false;
	setOpenAdd(isOpen: any) {
		this.mostrarCondicionais = false;
		this.clientesFiltrados = this.options;
		if (isOpen == true) {
			this.modalOpenAdd = isOpen;
			this.createFormAdd();
			setTimeout(() => {
			}, 1)
			return;
		}
		if (!isOpen) {
			this.modalOpenAdd = isOpen;
			return;
		}
		if (isOpen == 'submit') {
			setTimeout(() => {
				this.modalOpenAdd = false;
			}, 100);
		}
	}
	// Form de edição
	EditForm!: FormGroup;
	createFormEdit() {
		this.EditForm = new FormGroup({
			id_edit: new FormControl(''),
			cliente_edit: new FormControl('', [Validators.required]),
			calendario_edit: new FormControl('', [Validators.required]),
			servicos_edit: new FormControl('', [Validators.required]),
			formaDePagamento_edit: new FormControl('', [Validators.required]),
		});
	}
	get cliente_edit() {
		return this.EditForm.get('cliente_edit')!;
	}
	get calendario_edit() {
		return this.EditForm.get('calendario_edit')!;
	}
	get servicos_edit() {
		return this.EditForm.get('servicos_edit')!;
	}
	get formaDePagamento_edit() {
		return this.EditForm.get('formaDePagamento_edit')!;
	}
	submit_edit() {
		console.log(this.EditForm.value);
		if (this.EditForm.valid) {
			let dia_hora = ((this.EditForm.value.calendario_edit).replace('.000Z', '')).split('T');
			let agendamento = {
				id_agendamento: this.indiceEdit,
				status_agendamento: 'e',
				hora_inicio_agendamento: dia_hora[1] + ':00',
				cli_agendamento: this.EditForm.value.cliente_edit,
				serv_agendamento: this.EditForm.value.servicos_edit,
				metodo_de_pagamento: this.EditForm.value.formaDePagamento_edit,
				preco_agend: this.precoAgend,
				data_agend: dia_hora[0],
			}
			this.agendamentosService.update(agendamento).subscribe((dados: any) => {
				if (dados.success == '1') {
					this.message = dados.message
					this.setOpenEdit('submit');
					this.ExibirMessage(true);
					this.listAgendamentos(dia_hora[0]);
					return;
				}
				this.message = dados.message;
				this.ExibirMessage(false);
			})
			return;
		}
		this.message = 'Falha ao alterar... :('
		this.ExibirMessage(false);
	}

	myDateEdit: any = '';
	inputClienteEdit: any = '';
	inputServicosEdit: any[] = [];
	inputMetodoPagamentoEdit: any = '';

	indiceEdit: any;
	EditAgendamento(agendamento: any) {
		this.inputServicosEdit = [];
		this.indiceEdit = agendamento.id_agendamento;
		let data = agendamento.data_agend.split('/');
		this.myDateEdit = `${data[2]}-${data[1]}-${data[0]}T${agendamento.hora_inicio_agendamento}`;
		let cliente = this.Clientes.find((dados: any) => dados.cliente_nome == agendamento.cli_agendamento);
		this.inputClienteEdit = cliente?.id_cliente;
		let servico = this.Servicos.filter((dados: any) => agendamento.serv_agendamento.includes(dados.titulo_servico));
		servico.forEach((element: any) => {
			this.inputServicosEdit.push(element.id_servico);
		});
		this.inputMetodoPagamentoEdit = agendamento.metodo_de_pagamento;
		this.precoAgend = agendamento.preco_agend;
		this.setOpenEdit(true);
	}
	// Modal de Edição
	modalOpenEdit = false;
	setOpenEdit(isOpen: any) {
		if (isOpen == true) {
			this.modalOpenEdit = isOpen;
			this.createFormEdit();
			setTimeout(() => {
			}, 1)
			return;
		}
		if (!isOpen) {
			this.modalOpenEdit = isOpen;
			return;
		}
		if (isOpen == 'submit') {
			setTimeout(() => {
				this.modalOpenEdit = false;
			}, 100);
		}
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
			this.agendamentosService.delete(this.indiceDel).subscribe(() => {
				this.Agendamentos = this.Agendamentos.filter((agendamento: any) => agendamento.id_agendamento !== this.indiceDel);
				console.log(this.Agendamentos);
				this.Agendamentos_exibidos = this.Agendamentos_exibidos.filter((agendamento: any) => agendamento.id_agendamento !== this.indiceDel);
				console.log(this.Agendamentos_exibidos);
			})
		}
	}

	// Filtro por nome de clientes
	search(e: Event): void {
		let estado: boolean = false;
		const target = e.target as HTMLInputElement;
		const value = target.value;
		this.Agendamentos_exibidos = this.Agendamentos.filter((agendamento) => {
			if (agendamento.cli_agendamento.includes(value.toLocaleLowerCase())) {
				estado = true;
			}
			if (!value) {
				estado = false;
			}
			return agendamento.cli_agendamento.includes(value.toLocaleLowerCase());
		});
		this.verificarEstado(estado);
	}
	// Reseta o agendamentos exibidos caso estado false
	verificarEstado(estado: boolean) {
		if (!estado) {
			setTimeout(() => {
				this.atualizarDados(this.hoje);
				this.diaValido = true;
			}, 1000)
		}
	}

	// Filtro de dias validos
	isWeekday = (dateString: string) => {
		const date = new Date(dateString);
		const utcDay = date.getUTCDay();
		return utcDay !== 0 && utcDay !== 1;
	}

	// Menssagem de aviso
	OpenToast: boolean = false;
	message: String = '';
	toast: any;
	ExibirMessage(estado: boolean) {
		if (estado) {
			this.toast.classList.remove('fail');
			this.toast.classList.add('success');
			this.OpenToast = true;
			setTimeout(() => {
				this.OpenToast = false;
			}, 3000);
			console.log(this.toast)
			return;
		}
		this.toast.classList.remove('success');
		this.toast.classList.add('fail');
		this.OpenToast = true;
		setTimeout(() => {
			this.OpenToast = false;
		}, 3000)
		console.log(this.toast)
	}

	precoAgend: String = '0.00';
	precoAgendamento(e: any) {
		let preco: number = 0;
		let id = e.value;
		id.forEach((currentId: number) => {
			let servico = this.Servicos.find((element: any) => element.id_servico == currentId);
			if (servico) {
				preco += parseFloat(servico.preco_servico);
				console.log(preco)
			}
		});
		this.precoAgend = preco.toFixed(2);
	}

	modalOpenComanda = false;
	setOpenComanda(isOpen: any) {
		if (isOpen == true) {
			this.modalOpenComanda = isOpen;
			setTimeout(() => {
			}, 1)
			return;
		}
		if (!isOpen) {
			this.modalOpenComanda = isOpen;
			return;
		}
	}

	indiceComanda: any
	valorTotal: Number = 0;
	gerarComanda(indice: any) {
		this.indiceComanda = indice;
		this.setOpenComanda(true);
		this.agendamentosService.comandaGenerate(this.indiceComanda).subscribe((dados: any) => {
			this.Servicos_comanda = dados.servicos;
			this.valorTotal = dados.total.toFixed(2);

		});
	}

	// função para imprimir a comanda selecionada
	imprimirComanda() {
		window.print();
	}

	readonly numberMask: MaskitoOptions = numberMask;
	readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();
}
