import { Component, Input, OnInit } from '@angular/core';
import { Lembretes } from 'src/app/models/lembretes';
import { LembretesService } from 'src/app/services/lembretes/lembretes.service';

@Component({
	selector: 'app-lembretes',
	templateUrl: './lembretes.page.html',
	styleUrls: ['./lembretes.page.scss'],
})
export class LembretesPage implements OnInit {
	Lembretes: Lembretes[] = [];
	Lembretes_exibidos: Lembretes[] = [];

	ngOnInit() {
	};

	constructor(private LembretesService: LembretesService) {
		this.list_lembretes()
	};

	list_lembretes() {
		this.LembretesService.list().subscribe((dados: any) => {
			if (dados.success == '1') {
				this.Lembretes = dados.lembretes;
				this.Lembretes_exibidos = this.Lembretes.filter((lembrete:any) => new Date(`${lembrete.dataLembrete}T${lembrete.horario}`) >= new Date()).map((dados: any) => {
					var data: any = dados.dataLembrete.split("-");
					data = `${data[2]}/${data[1]}/${data[0]}`;
					let horario: any = dados.horario.substr(0, 5);
					let horario_lembrete: any = dados.horarioLembrete.substr(0, 5);
					return { ...dados, dataLembrete: data, horario: horario, horarioLembrete: horario_lembrete };
				});
				
		console.log(this.Lembretes_exibidos)
		console.log(this.Lembretes)
		return;
	}
			this.Lembretes = [];
this.Lembretes_exibidos = this.Lembretes;
		})
	}

remover_cliente(id: any) {
	this.LembretesService.delete(id).subscribe(() => this.Lembretes = this.Lembretes.filter((lembrete: any) => lembrete.id !== id));
}
}