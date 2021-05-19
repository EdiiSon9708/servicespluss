import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '@core/services/auth/auth.service';
import { MessageService } from '@core/services/message/message.service';
import { RouterLinkActive } from '@angular/router';

import { User } from '@shared/models/user';

import { NgxSpinnerService } from 'ngx-spinner';
import { NgwWowService } from 'ngx-wow';

import { LocalServiceService } from '@core/services/localService/local-service.service';

@Component({
  selector: 'app-header-two',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  
  Cotizacion:string;
  dataUser: User;
  viewMenu = true;
  /** Variables globales */
  user$: Observable<User> = this.authService.currentUser;

  constructor(private wowService: NgwWowService, private authService: AuthService, private router: Router,
              private messageService: MessageService, private spinner: NgxSpinnerService, private localService: LocalServiceService) {
              
              this.dataUser = this.authService.currentUservalue;
             
            }

  ngOnInit(): void {
    this.wowService.init();
  }


  /**
   * Metodo que loguea al usuario
   */
  async logOut() {
    this.spinner.show();
    try {
      await this.authService.logOut().subscribe(resp => {
        if (resp.status === 1) {
          this.spinner.hide();
          this.authService.deleteToken();
          this.authService.loggedIn.next(false);
          this.authService.currentUserSubject.next(null);
          this.messageService.toastSuccess(resp.msn);
          this.authService.currentUserSubject.next(null);
          this.router.navigate(['/']);
        } else {
          this.messageService.toastError(resp.msn);
        }
      });
    } catch (error) {
      this.spinner.hide();
      this.authService.handlerError(error);
      console.error('Error logOut en componente', error);
    }
  }

  cotizacion(){
    if (this.dataUser) {
    }
    else {
      const msn = 'Clic en continuar, y regístrate';
      this.localService.setJsonValue('crear_servicio',1);
      this.messageService.alertCotizaciónSesion(msn);
     }
  }
}
