import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Lembretes } from 'src/app/models/lembretes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LembretesService {

  // private readonly API = 'http://localhost/aula/php/admin/clientes/';
  private readonly API = environment.baseApiUrl;

  contador: number = 0;

  atualizarContagem(dado: number) {
    this.contador = dado;
    console.log(this.contador)  
  }

  constructor(private httpClient: HttpClient) { }

  contagem() {
    return this.httpClient.get(this.API + 'lembretes/contador_de_lembretes.php').pipe(
      tap(contador => {
        console.log(contador);
      })
    );
  }

  list() {
    return this.httpClient.get<Lembretes[]>(this.API + 'lembretes/listar_lembretes.php').pipe(
      tap(lembretes => console.log(lembretes))
    );
  }

  delete(id: any) {
    return this.httpClient.delete(this.API + 'lembretes/remover_lembretes.php?id=' + id);
  }
}
