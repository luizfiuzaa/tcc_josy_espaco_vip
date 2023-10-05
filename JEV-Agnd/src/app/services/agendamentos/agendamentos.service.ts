import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Agendamentos } from 'src/app/models/agendamentos';

@Injectable({
  providedIn: 'root'
})
export class AgendamentosService {

  // private readonly API = 'http://localhost/aula/php/admin/agendamentos/';
  private readonly API = 'http://arquivosdaaulaapi/php/admin/agendamentos/';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Agendamentos[]>(this.API + 'listar_agendamentos.php').pipe(
      tap(agendamentos => console.log(agendamentos))
    );
  }

  delete(id: any) {
    return this.httpClient.delete(this.API + 'remover_agendamento.php?id=' + id);
  }

  create(agendamento: any[]){
    console.log(agendamento)
    return this.httpClient.post(this.API + 'insert_agendamento.php', agendamento[0]);
  }
}
