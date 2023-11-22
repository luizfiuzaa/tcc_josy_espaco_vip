import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Agendamentos } from 'src/app/models/agendamentos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly API = environment.baseApiUrlLogin;

  constructor(private httpClient: HttpClient) { }

  autorizado = false;

  autorizar(token: any) {
    localStorage.setItem('token', token)
  }

  deslogar() {
    localStorage.clear();
  }

  statusLogin() {
    let token = localStorage.getItem('token');
    return this.httpClient.post(this.API + 'login/verificarlogin.php', { 'token': token });
  }

  verificar(login: any[]) {
    console.log(login)
    return this.httpClient.post(this.API + 'login/logar.php', login);
  }
}
