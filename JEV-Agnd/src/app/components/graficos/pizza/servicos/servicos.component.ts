import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { FaturamentosService } from 'src/app/services/faturamentos/faturamentos.service';

Chart.register(...registerables);

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss'],
})
export class ServicosComponent implements OnInit {


  constructor(private FaturamentosService: FaturamentosService) { }

  servicos: any[] = [];
  isLoading: boolean = true;

  ngOnInit() {
    this.getDados();
  }

  getDados() {
    this.isLoading = true;
    this.FaturamentosService.listServicos().subscribe((dados: any) => {
      this.servicos = dados.data;
      console.log(this.servicos);
      this.isLoading = false;
      setTimeout(() => {
        this.gerarGraficoServicos();
      }, 100)
    })
  }

  gerarGraficoServicos() {
    var myChart = new Chart("servico", {
      type: 'doughnut',
      data: {
        labels: this.servicos[0].titulo_servico.map((element: any) => {
          return element.charAt(0).toUpperCase() + element.substr(1);
        }),
        datasets: [{
          label: 'Quantidade',
          data: this.servicos[0].frequencia.map((element: any) => {
            return element;
          }),
          backgroundColor: this.servicos[0].cor.map((element: any) => {
            return element;
          }),
          borderColor: this.servicos[0].cor.map((element: any) => {
            return element;
          }),
          borderWidth: 1
        }]
      },
      options: {

      }
    });
  }
}
