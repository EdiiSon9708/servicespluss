import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Componentes fullscreen */
import { ErrorPageComponent } from '@modules/inner-pages/error-page/error-page.component';
import { LoginPageComponent } from '@modules/inner-pages/login-page/login-page.component';
import { CheckMailComponent } from '@modules/inner-pages/check-mail/check-mail.component';


import { AuthGuard } from '@shared/guards/auth/auth.guard';
import { LoginRegisterComponent } from './modules/inner-pages/login-register/login-register.component';
import { TerminosComponent } from './modules/inner-pages/terminos/terminos.component';
import { RestorePasswordComponent } from './modules/inner-pages/restore-password/restore-password.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('@app/modules/pages.module').then(m => m.PagesModule) },
  { path: 'login', component: LoginPageComponent, canActivate: [AuthGuard] },
  { path: 'loginRegister', component: LoginRegisterComponent },
  { path: 'restore/:token', component: RestorePasswordComponent },
  { path: 'verify/:token', component: CheckMailComponent },
  { path: 'terminos', component: TerminosComponent },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
