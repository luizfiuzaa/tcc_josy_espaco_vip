import { Component, OnInit, ViewChild } from '@angular/core';
import { FaturamentosService } from 'src/app/services/faturamentos/faturamentos.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-faturamentos',
  templateUrl: './faturamentos.page.html',
  styleUrls: ['./faturamentos.page.scss'],
})
export class FaturamentosPage implements OnInit {
  
  constructor(private Faturamentos: FaturamentosService) { }

  ngOnInit() {
  }

}
