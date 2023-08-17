import { Component, Input, OnInit } from '@angular/core';

interface CardDados {
  tituloCard: string;
  descricaoCard: string;
  duracaoCard: string;
  precoCard: string;
}

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
})
export class ServicosPage implements OnInit {

  @Input() Card_Dados: CardDados[] = []

  ngOnInit() {
  }

  CardDados: any[] = [
    {
      tituloCard: 'Unhas',
      descricaoCard: 'Um ótimo serviço para quem tem dinheiro, e vontade de ficar lindo.',
      duracaoCard: '1h',
      precoCard: '34.00',
    },
    {
      tituloCard: 'Cabelo',
      descricaoCard: 'Um ótimo serviço para quem tem dinheiro, e vontade de ficar lindo.',
      duracaoCard: '2h',
      precoCard: '40.00',
    },
    {
      tituloCard: 'Sombrancelhas',
      descricaoCard: 'Um ótimo serviço para quem tem dinheiro, e vontade de ficar lindo.',
      duracaoCard: '30mins',
      precoCard: '30.00',
    },
    {
      tituloCard: 'Sombrancelhas',
      descricaoCard: 'Um ótimo serviço para quem tem dinheiro, e vontade de ficar lindo.',
      duracaoCard: '30mins',
      precoCard: '30.00',
    },
    {
      tituloCard: 'Sombrancelhas',
      descricaoCard: 'Um ótimo serviço para quem tem dinheiro, e vontade de ficar lindo.',
      duracaoCard: '30mins',
      precoCard: '30.00',
    },
    {
      tituloCard: 'Pés',
      descricaoCard: 'Um ótimo serviço para quem tem dinheiro, e vontade de ficar lindo.',
      duracaoCard: '1h',
      precoCard: '35.00',
    }
  ];


}
