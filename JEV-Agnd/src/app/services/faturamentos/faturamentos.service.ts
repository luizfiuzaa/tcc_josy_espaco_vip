import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Metodos } from 'src/app/models/metodos';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaturamentosService {

  private readonly API = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  listMetodos() {
    return this.httpClient.get<Metodos[]>(this.API + 'faturamentos/listar_metodos.php').pipe(
      tap(metodos => console.log(metodos))
    );
  }

  listServicos() {
    return this.httpClient.get<Metodos[]>(this.API + 'faturamentos/listar_servicos.php').pipe(
      tap(servicos => console.log(servicos))
    );
  }

  listFaturamentoMensal() {
    return this.httpClient.get<Metodos[]>(this.API + 'faturamentos/listar_faturamentos.php').pipe(
      tap(faturamento => console.log(faturamento))
    );
  }
}
