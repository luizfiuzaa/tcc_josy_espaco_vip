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
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',

          ],
          borderWidth: 1
        }]
      },
      options: {
 
      }
    });
  }

}
