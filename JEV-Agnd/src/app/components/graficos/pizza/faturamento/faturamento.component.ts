import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Metodos } from 'src/app/models/metodos';
import { FaturamentosService } from 'src/app/services/faturamentos/faturamentos.service';

Chart.register(...registerables);

@Component({
  selector: 'app-faturamento',
  templateUrl: './faturamento.component.html',
  styleUrls: ['./faturamento.component.scss'],
})
export class FaturamentoComponent implements OnInit {

  constructor(private FaturamentosService: FaturamentosService) { }

  metodos: Metodos[] = [];
  isLoading: boolean = true;

  ngOnInit() {
    this.getDados()
  }

  getDados() {
    this.isLoading = true;
    this.FaturamentosService.listMetodos().subscribe((dados: any) => {
      this.metodos = dados.data;
      this.isLoading = false;
      setTimeout(() => {
        this.gerarGraficoFormasPagamento();
      }, 100)
    })
  }

  gerarGraficoFormasPagamento() {
    var myChart = new Chart("faturamento", {
      type: 'doughnut',
      data: {
        labels: ['Pix', 'Dinheiro', 'Cartão'],
        datasets: [{
          label: 'Quantia',
          data: [this.metodos[0].pix, this.metodos[0].dinheiro, this.metodos[0].cartao],
          backgroundColor: [
            '#45C0A4',
            '#034C8C',
            '#D90D43'

          ],
          borderColor: [
            '#45C0A4',
            '#034C8C',
            '#D90D43'
          ],
          borderWidth: 1
        }]
      },
      options: {

      }
    });
  }

}
