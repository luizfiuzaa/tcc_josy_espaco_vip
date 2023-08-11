import { Component, Input, OnInit } from '@angular/core';

interface SlideImage {
  imageSrc: string;
  imageAlt: string;
  titulo: string;
  descricao: string;
}

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent implements OnInit {

  @Input() images_slide: SlideImage[] = []
  slide_cont: any;

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    const div_cont = document.querySelector('.slide-container') as HTMLElement;
    let firstImageWidth = 250 + 40;
    const btnPrev = document.querySelector('.btn-prev_slide') as HTMLElement;
    const btnNext = document.querySelector('.btn-next_slide') as HTMLElement;
    let inicioMov = false, prevPageX: any, prevScrollLeft: any;

    btnNext?.addEventListener('click', () => {
      div_cont.scrollLeft +=  firstImageWidth;
    });

    btnPrev?.addEventListener('click', () => {
      div_cont.scrollLeft -=  firstImageWidth;
    })

    div_cont?.addEventListener('mousemove', (e) =>{
      //  Girando o caousel de acordo com o movimento do mouse
      if(!inicioMov) return;
      e.preventDefault();
      div_cont.classList.add("movendo");
      let position = e.pageX - prevPageX;
      div_cont.scrollLeft = prevScrollLeft - position;
    });

    div_cont?.addEventListener('mousedown', (e) =>{
      // atualizando variaveis globais
      inicioMov = true;
      prevPageX = e.pageX;
      prevScrollLeft = div_cont.scrollLeft;
    });

    div_cont?.addEventListener('mouseup', (e) =>{
      inicioMov = false;
      div_cont.classList.remove("movendo");
    });
  }
}


