import { Component, Input, OnInit } from '@angular/core';

interface Lembretes {
  horarioLembrete: string;
  conteudoLembrete: string;
}

@Component({
  selector: 'app-lembretes',
  templateUrl: './lembretes.page.html',
  styleUrls: ['./lembretes.page.scss'],
})
export class LembretesPage implements OnInit {
  @Input() Lembrete: Lembretes[] = [];

  ngOnInit() {
  };

  constructor() {
  }

  ngAfterViewInit() {
    const lista = document.querySelector('.list') as HTMLElement;
    const fabBtn = document.querySelector('#fab') as HTMLElement;

    lista.addEventListener('scroll', () => {
      if (lista.scrollTop > 0) {
        fabBtn.classList.remove('none');
      }
      if (lista?.scrollTop == 0) {
        fabBtn?.classList.add('none');
      }
    })
  }

  ScrollTop(): void{
    const lista = document.querySelector('.list') as HTMLElement;
    lista.scrollTop = 0;
  }

  Lembretes = [
    {
      horarioLembrete: '10:00',
      conteudoLembrete: 'Você tem um agendamento marcado as 10:30'
    },
    {
      horarioLembrete: '10:00',
      conteudoLembrete: 'Você tem um agendamento marcado as 10:30'
    },
    {
      horarioLembrete: '10:00',
      conteudoLembrete: 'Você tem um agendamento marcado as 10:30'
    },
    {
      horarioLembrete: '10:00',
      conteudoLembrete: 'Você tem um agendamento marcado as 10:30'
    },
    {
      horarioLembrete: '10:00',
      conteudoLembrete: 'Você tem um agendamento marcado as 10:30'
    },
    {
      horarioLembrete: '10:00',
      conteudoLembrete: 'Você tem um agendamento marcado as 10:30'
    },
    {
      horarioLembrete: '10:00',
      conteudoLembrete: 'Você tem um agendamento marcado as 10:30'
    },
    {
      horarioLembrete: '10:00',
      conteudoLembrete: 'Você tem um agendamento marcado as 10:30'
    },
    {
      horarioLembrete: '11:00',
      conteudoLembrete: 'Você tem um agendamento marcado as 12:00'
    },
    {
      horarioLembrete: '13:00',
      conteudoLembrete: 'Você tem um agendamento marcado as 14:00'
    },
    {
      horarioLembrete: '17:00',
      conteudoLembrete: 'Você tem um agendamento marcado as 10:00'
    }
  ];
}
