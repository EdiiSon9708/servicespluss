import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '@core/services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /** Variables globales */
  islogOut: boolean;
  aceptaTerminos:number=0;

  /**
   * Servicio de autenticacion
   */
  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLogged.subscribe(resp => {
      this.islogOut = resp;
    });
        console.log(this.authService.currentUservalue);
    // this.authService.currentUser.subscribe(resp => {
    //   this.aceptaTerminos=resp.aceptaTerminos;
    // })
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.islogOut === false) {
      return true;
    } else {
      // if(this.aceptaTerminos==0)
      // {
      //   this.router.navigate(['/terminos']);
      //   return false;
      // }
      this.router.navigate(['/admin']);
      return false;
    }
  }

}
