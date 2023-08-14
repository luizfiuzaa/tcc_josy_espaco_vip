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
