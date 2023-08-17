import { Component, Input, OnInit } from '@angular/core';
import { CheckboxCustomEvent } from '@ionic/angular';

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
  canDismiss = false;

  presentingElement: any;

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page') as HTMLElement;
  }

  modalOpen1 = false;

  setOpen1(isOpen: boolean) {
    this.modalOpen1 = isOpen;
  }

  // modal 2
  modalOpen2 = false;

  setOpen2(isOpen: boolean) {
    this.modalOpen2 = isOpen;
  }

  // modal 3
  modalOpen3 = false;

  setOpen3(isOpen: boolean) {
    this.modalOpen3 = isOpen;
  }

  // modal 4
  modalOpen4 = false;

  setOpen4(isOpen: boolean) {
    this.modalOpen4 = isOpen;
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
