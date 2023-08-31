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
        labels: ['Janeiro', 'Fevereiro', 'Março', "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
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
            '#E33058',
            '#8C1843',
            '#D3294E',
            '#F04A62',
            '#F04A62',
            '#D22A4E',
          ],
          borderColor: [
            '#E33058',
            '#8C1843',
            '#D3294E',
            '#F04A62',
            '#F04A62',
            '#D22A4E',
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
