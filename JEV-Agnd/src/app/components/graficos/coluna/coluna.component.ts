import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { FaturamentosService } from 'src/app/services/faturamentos/faturamentos.service';
Chart.register(...registerables);

@Component({
  selector: 'app-coluna',
  templateUrl: './coluna.component.html',
  styleUrls: ['./coluna.component.scss'],
})
export class ColunaComponent implements OnInit {

  constructor(private FaturamentosService: FaturamentosService) { }

  faturamento_mensal: any[] = [];
  isLoading: boolean = true;

  ngOnInit() {
    this.getDados();
  }

  getDados() {
    this.isLoading = true;
    this.FaturamentosService.listFaturamentoMensal().subscribe((dados: any) => {
      this.faturamento_mensal = dados.data;
      this.isLoading = false;
      setTimeout(()=>{
        this.gerarGraficoFaturamentoMensal();
      },100)
    })
  }

  gerarGraficoFaturamentoMensal() {
    var myChart = new Chart("coluna", {
      type: 'bar',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        datasets: [{
          label: 'Faturamento mensal',
          data: this.faturamento_mensal.map((element: any) => {
            return element;
          }),
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
