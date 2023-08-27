import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-faturamento',
  templateUrl: './faturamento.component.html',
  styleUrls: ['./faturamento.component.scss'],
})
export class FaturamentoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.gerarGraficoFormasPagamento()
  }

  pix: number = 2
  dinheiro: number = 10
  cartao: number = 10

  gerarGraficoFormasPagamento() {
    var myChart = new Chart("faturamento", {
      type: 'doughnut',
      data: {
        labels: ['Pix', 'Dinheiro', 'Cartão'],
        datasets: [{
          label: 'Quantia',
          data: [this.pix, this.dinheiro, this.cartao],
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
