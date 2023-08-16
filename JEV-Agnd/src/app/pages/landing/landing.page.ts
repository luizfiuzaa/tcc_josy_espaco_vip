import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  title = 'carousel';

  images_carousel = [
    {
      imageSrc:
        'https://images.pexels.com/photos/109243/pexels-photo-109243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      imageAlt: 'nature1',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imageAlt: 'nature2',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1640844444545-66e19eb6f549?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80',
      imageAlt: 'person1',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imageAlt: 'person2',
    },
  ]

  images_slide = [
    {
      imageSrc:
        'https://images.pexels.com/photos/109243/pexels-photo-109243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      imageAlt: 'nature1',
      titulo: 'nature1',
      descricao: 'O trabalho duro é a chave para o sucesso, mas a persistência é a chave para alcançá-lo.',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imageAlt: 'nature2',
      titulo: 'nature2',
      descricao: 'O trabalho não é apenas uma obrigação, mas uma oportunidade para crescer e se desenvolver.',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1640844444545-66e19eb6f549?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80',
      imageAlt: 'person1',
      titulo: 'person1',
      descricao: 'O trabalho em equipe é a chave para alcançar grandes objetivos.',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imageAlt: 'person2',
      titulo: 'person2',
      descricao: 'O trabalho não deve ser apenas uma fonte de renda, mas também uma fonte de satisfação pessoal.',
    },
    {
      imageSrc:
        'https://images.pexels.com/photos/3172985/pexels-photo-3172985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      imageAlt: 'person2',
      titulo: 'person2',
      descricao: 'O trabalho é a arte de transformar sonhos em realidade.',
    },
    {
      imageSrc:
        'https://images.pexels.com/photos/17719873/pexels-photo-17719873/free-photo-of-san-diego.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      imageAlt: 'person2',
      titulo: 'person2',
      descricao: 'O trabalho é a chave para o sucesso, mas a dedicação e o esforço são as fechaduras que abrem as portas.',
    },
  ]

  ngOnInit() {
  }
  ngAfterViewInit() {
  }
}

