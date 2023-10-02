import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Servicos } from 'src/app/models/servico';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  // private readonly API = 'http://localhost/aula/php/admin/servicos/';
  private readonly API = 'http://arquivosdaaulaapi/API/php/admin/servicos/';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Servicos[]>(this.API+'listar_servicos.php').pipe(
      tap(servicos => console.log(servicos))
    );
  }

  delete(id: any) {
    return this.httpClient.delete(this.API+'remover_servicos.php?id='+ id);
  }

  create(servicos: FormData): Observable<FormData> {
    return this.httpClient.post<FormData>(this.API+'insert_servicos.php', servicos); 
  } 
}
