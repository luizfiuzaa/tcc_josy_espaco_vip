import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-coluna',
  templateUrl: './coluna.component.html',
  styleUrls: ['./coluna.component.scss'],
})
export class ColunaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.gerarGraficoFormasPagamento()
  }

  mes = [2, 7, 32, 23, 45, 32, 4, 35, 6, 7, 10, 40]


  gerarGraficoFormasPagamento() {
    var myChart = new Chart("coluna", {
      type: 'bar',
      data: {
        labels: ['Janeira', 'Fevereiro', 'Março', "Abril", "Maio", "Junho", "Julho", "Agusto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        datasets: [{
          label: 'Faturamento mensal',
          data: [
            this.mes[0],
            this.mes[1],
            this.mes[2],
            this.mes[3],
            this.mes[4],
            this.mes[5],
            this.mes[6],
            this.mes[7],
            this.mes[8],
            this.mes[9],
            this.mes[10],
            this.mes[11],
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',          ],
          borderColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
