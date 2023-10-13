import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-faturamentos',
  templateUrl: './faturamentos.page.html',
  styleUrls: ['./faturamentos.page.scss'],
})
export class FaturamentosPage implements OnInit {

  @ViewChild('formDir') formDir!: NgForm;

  constructor() { }

  ngOnInit() {
  }

  submit_add() {
    console.log(this.formDir.form.value);
  }
}
