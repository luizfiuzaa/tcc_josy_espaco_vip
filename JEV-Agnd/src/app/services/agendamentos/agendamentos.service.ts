import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Agendamentos } from 'src/app/models/agendamentos';

@Injectable({
  providedIn: 'root'
})
export class AgendamentosService {

  private readonly API = '/assets/agendamentos.json';

  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<Agendamentos[]>(this.API)
    .pipe(
      tap(agendamentos => console.log(agendamentos))
    );
  }
}
