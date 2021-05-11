import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '@core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  /** Variables globales */
  isloggedIn: boolean;

  /**
   * Servicio de autenticacion
   */
  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLogged.subscribe(resp => {
      this.isloggedIn = resp;
    });
    // console.log(this.authService.currentUservalue);
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isloggedIn === true) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
