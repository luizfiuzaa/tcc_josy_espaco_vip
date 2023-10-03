import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Clientes } from 'src/app/models/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly API = 'http://localhost/aula/php/admin/clientes/';
  // private readonly API = 'http://arquivosdaaulaapi/API/php/admin/clientes/';


  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Clientes[]>(this.API+'listar_clientes.php').pipe(
      tap(clientes => console.log(clientes))
    );
  }

  delete(id: any) {
    return this.httpClient.delete(this.API+'remover_clientes.php?id='+ id);
  }

  create(cliente: any[]) {
    console.log(cliente)
    return this.httpClient.post(this.API+'insert_clientes.php', cliente); 
  } 
}
