import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Clientes } from 'src/app/models/clientes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  // private readonly API = 'http://localhost/aula/php/admin/clientes/';
  private readonly API = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Clientes[]>(this.API+'clientes/listar_clientes.php').pipe(
      tap(clientes => console.log(clientes))
    );
  }

  delete(id: any) {
    return this.httpClient.delete(this.API+'clientes/remover_clientes.php?id='+ id);
  }

  create(cliente: any[]) {
    return this.httpClient.post(this.API+'clientes/insert_clientes.php', cliente[0]); 
  } 
}
