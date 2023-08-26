import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';

@Component({
  selector: 'app-msg-definidas',
  templateUrl: './msg-definidas.page.html',
  styleUrls: ['./msg-definidas.page.scss'],
})
export class MsgDefinidasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // modal 1
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
}
