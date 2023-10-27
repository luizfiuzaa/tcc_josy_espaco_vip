import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Clientes } from 'src/app/models/clientes';
import { InfoClientes } from 'src/app/models/infoClientes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  // private readonly API = 'http://localhost/aula/php/admin/clientes/';
  private readonly API = environment.baseApiUrl;
  
  clientes: Clientes[] = [];

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Clientes[]>(this.API + 'clientes/listar_clientes.php').pipe(
      tap(clientes => {
        console.log(clientes);
        this.clientes = clientes;
      })
    );
  }

  listInfomacoes(id: any) {
    return this.httpClient.get<InfoClientes[]>(this.API + 'clientes/listar_infoClientes.php?id=' + id).pipe(
      tap(dados => console.log(dados))
    );
  }

  delete(id: any) {
    return this.httpClient.delete(this.API + 'clientes/remover_clientes.php?id=' + id);
  }

  create(cliente: any) {
    return this.httpClient.post(this.API + 'clientes/insert_clientes.php', cliente[0]);
  }

  update(cliente: any) {
    return this.httpClient.put(this.API + 'clientes/update_clientes.php', cliente);
  }
}
