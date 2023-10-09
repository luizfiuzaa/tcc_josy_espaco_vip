import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminPermicaoGuard } from './_guard/admin-permicao.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/admin/home/home.module').then(m => m.HomePageModule),
    canActivate: [AdminPermicaoGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/user-common/landing/landing.module').then(m => m.LandingPageModule)
  },
  {
    path: 'servicos',
    loadChildren: () => import('./pages/admin/servicos/servicos.module').then(m => m.ServicosPageModule),
    canActivate: [AdminPermicaoGuard]
  },
  {
    path: 'faturamentos',
    loadChildren: () => import('./pages/admin/faturamentos/faturamentos.module').then(m => m.FaturamentosPageModule),
    canActivate: [AdminPermicaoGuard]
  },
  {
    path: 'msg-definidas',
    loadChildren: () => import('./pages/admin/msg-definidas/msg-definidas.module').then(m => m.MsgDefinidasPageModule),
    canActivate: [AdminPermicaoGuard]
  },
  {
    path: 'lembretes',
    loadChildren: () => import('./pages/admin/lembretes/lembretes.module').then(m => m.LembretesPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pages/admin/clientes/clientes.module').then(m => m.ClientesPageModule),
    canActivate: [AdminPermicaoGuard]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
