import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Lembretes } from 'src/app/models/lembretes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LembretesService {
  private readonly API = environment.baseApiUrl;

  contador: number = 0;

  constructor(private httpClient: HttpClient) { }

  atualizarContagem(dado: number) {
    this.contador = dado;
    console.log(this.contador)
  }

  contagem() {
    return this.httpClient.get(this.API + 'lembretes/contador_de_lembretes.php').pipe(
      tap(contador => {
        console.log(contador);
      })
    );
  }

  alterarStatus(lembretes: Lembretes[]) {
    console.log('passei aqui')
    return this.httpClient.put(this.API + 'lembretes/alterar_status.php', lembretes).pipe(
      tap(mensagem => console.log(mensagem))
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
