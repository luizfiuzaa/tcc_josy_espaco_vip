import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Agendamentos } from 'src/app/models/agendamentos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendamentosService {

  private readonly API = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Agendamentos[]>(this.API + 'agendamentos/listar_agendamentos.php').pipe(
      tap(agendamentos => console.log(agendamentos))
    );
  }

  delete(id: any) {
    return this.httpClient.delete(this.API + 'agendamentos/remover_agendamento.php?id=' + id);
  }

  create(agendamento: any) {
    console.log(agendamento)
    return this.httpClient.post(this.API + 'agendamentos/insert_agendamento.php', agendamento);
  }

  update(agendamento: any) {
    console.log(agendamento)
    return this.httpClient.put<FormData>(this.API + 'agendamentos/update_agendamento.php', agendamento);
  }

  comandaGenerate(id: any) {
    console.log(id);
    return this.httpClient.get(this.API + 'agendamentos/gerarComanda.php?id=' + id);
  }
}
