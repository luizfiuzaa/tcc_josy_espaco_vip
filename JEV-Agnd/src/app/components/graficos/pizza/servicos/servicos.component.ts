import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss'],
})
export class ServicosComponent implements OnInit {


  constructor() { }

  ngOnInit() {
    this.gerarGraficoFormasPagamento()
  }

  mao: number = 2
  pe: number = 10
  peMao: number = 10
  cabelo: number = 10


  gerarGraficoFormasPagamento() {
    var myChart = new Chart("servico", {
      type: 'doughnut',
      data: {
        labels: ['Mão', 'Pé', 'Pé e Mão', "Cabelo"],
        datasets: [{
          label: 'Quantidade',
          data: [this.mao, this.pe, this.peMao, this.cabelo],
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
