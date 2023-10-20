import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Lembretes } from 'src/app/models/lembretes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LembretesService {

  contadorLembretes: Number = 0;

  // private readonly API = 'http://localhost/aula/php/admin/clientes/';
  private readonly API = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Lembretes[]>(this.API+'lembretes/listar_lembretes.php').pipe(
      tap(lembretes => console.log(lembretes))
    );
  }

  delete(id: any) {
    return this.httpClient.delete(this.API+'lembretes/remover_lembretes.php?id='+ id);
  }
}
