import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Servicos } from 'src/app/models/servico';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  // private readonly API = 'http://localhost/aula/php/admin/servicos/';
  private readonly API = environment.baseApiUrl;
  
  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Servicos[]>(this.API+'servicos/listar_servicos.php').pipe(
      tap(servicos => console.log(servicos))
    );
  }

  delete(id: any) {
    return this.httpClient.delete(this.API+'servicos/remover_servicos.php?id='+ id);
  }

  create(servicos: any[]){
    console.log(servicos[0])
    return this.httpClient.post<FormData>(this.API+'servicos/insert_servicos.php', servicos[0]); 
  } 
}
