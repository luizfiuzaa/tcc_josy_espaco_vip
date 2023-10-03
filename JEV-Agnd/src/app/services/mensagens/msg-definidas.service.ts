import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Clientes } from 'src/app/models/clientes';

@Injectable({
  providedIn: 'root'
})
export class MsgDefinidasService {

  private readonly API = 'http://localhost/aula/php/admin/clientes/';

  
  constructor() { }
}
