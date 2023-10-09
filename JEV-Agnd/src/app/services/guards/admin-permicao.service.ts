import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminPermicaoService {

  autorizado = false;

  constructor() { }

  autorizar(){
    localStorage.setItem('login', 'sim')
  }

  deslogar(){
    localStorage.clear();
  }
  
  statusLogin(){
    return !!localStorage.getItem('login');
  }
}
