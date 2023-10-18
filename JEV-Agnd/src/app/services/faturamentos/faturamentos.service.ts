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

  metodos: boolean = false;
  servicos: boolean = false;
  faturamentos: boolean = false;
  isLoading: boolean = true;

  verficar() {
    this.isLoading = (this.metodos && this.servicos && this.faturamentos) ? false : true;
  }

  constructor(private httpClient: HttpClient) { }

  listMetodos() {
    this.metodos = false;
    return this.httpClient.get<Metodos[]>(this.API + 'faturamentos/listar_metodos.php').pipe(
      tap(metodos => {
        this.metodos = true;
        console.log(this.metodos);
        this.verficar()
        console.log(this.isLoading);
      })
    );
  }

  listServicos() {
    this.servicos = false;

    return this.httpClient.get<Metodos[]>(this.API + 'faturamentos/listar_servicos.php').pipe(
      tap(servicos => {
        this.servicos = true;
        console.log(this.servicos)
        this.verficar()
        console.log(this.isLoading);
      })
    );
  }

  listFaturamentoMensal() {
    this.faturamentos = false;
    return this.httpClient.get<Metodos[]>(this.API + 'faturamentos/listar_faturamentos.php').pipe(
      tap(faturamento => {
        this.faturamentos = true;
        console.log(this.faturamentos)
        this.verficar()
        console.log(this.isLoading);
      })
    );
  }
}
