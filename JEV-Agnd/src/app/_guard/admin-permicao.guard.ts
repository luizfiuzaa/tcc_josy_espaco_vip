import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return true
      return this.login.statusLogin().pipe(
      map((data: any) => {
        console.log(data);
        if (data.success == '1') {
          return true;
        }
        this.router.navigate(["/login"]);
        return false;
      })
    );
  }
}