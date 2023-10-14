import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Clientes } from 'src/app/models/clientes';
import { Mensagem } from 'src/app/models/mensagem';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MsgDefinidasService {

  private readonly API = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Mensagem[]>(this.API + 'mensagens/listar_mensagens').pipe(
      tap(mensagens => console.log(mensagens))
    );
  }

  create(mensagem: any[]){
    console.log(mensagem)
    return this.httpClient.post<FormData>(this.API+'mensagem/insert_mensagem.php', mensagem); 
  } 

  update(mensagem: any){
    return this.httpClient.put<FormData>(this.API+'mensagem/update_mensagem.php', mensagem);
  }
}
