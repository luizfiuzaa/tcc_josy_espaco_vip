import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminPermicaoGuard {

  constructor(
    private login: LoginService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const logado = this.login.statusLogin().subscribe((dados: any) => {
      return dados.success == "1" ? true : false;
    });
    console.log(logado)
    if (logado) {
      return true;
    }

    this.router.navigate(["/login"]);
    return false;

  }
}