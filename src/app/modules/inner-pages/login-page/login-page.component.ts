import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ModalTerminosComponent } from '@src/app/components/modals/modal-terminos/modal-terminos.component';
import { ModalLoginComponent } from '@src/app/components/modals/modal-login/modal-login.component';

import { AuthService } from '@core/services/auth/auth.service';
import { MessageService } from '@core/services/message/message.service';
import { ResponseApi } from '@shared/models/authentication';
import { Register } from '@shared/models/user';

/** Servicio de spinner */
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalAutorizaDatosComponent } from '../../../components/modals/modal-autoriza-datos/modal-autoriza-datos.component';
import { ModalAvisoPrivacidadComponent } from '../../../components/modals/modal-aviso-privacidad/modal-aviso-privacidad.component';
import { ModalPoliticaDatosComponent } from '../../../components/modals/modal-politica-datos/modal-politica-datos.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  /** Variables globales */
  message = 'Campos obligatorios por confirmar';
  selectedFormAuthentic = 0;
  userRegisterFormGroup: FormGroup;
  userLoginFormGroup: FormGroup;
  formRegister: Register = new Register();
  formLogin: Register = new Register();
  hide = true;
  respError: any;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router,
    private spinner: NgxSpinnerService, private messageService: MessageService, public dialog: MatDialog) { }

  ngOnInit(): void {
   
  }

  /** Inicializa el el formulario de registro de usuarios */
  // initFormRegister() {
  //   this.userRegisterFormGroup = this.formBuilder.group({
  //     fullName: ['', Validators.required],
  //     email: ['', Validators.required],
  //     password: ['', Validators.required],
  //     confirmPassword: ['', Validators.required],
  //     termsAndCondit: ['', Validators.required],
  //     termsAndCondit1: ['', Validators.required],
  //     termsAndCondit2: ['', Validators.required],
  //     termsAndCondit3: ['', Validators.required],
  //   });
  // }

  /** Inicializa el el formulario de registro de usuarios */
  // initFormLogin() {
  //   this.userLoginFormGroup = this.formBuilder.group({
  //     email: ['', Validators.required],
  //     password: ['', Validators.required],
  //   });
  // }

  /**
   * Funcion que hace cambio de login a register o recuperar contraseña
   * @param event Valor del dato traido del evento es numerico.
   */
  // changeForm(event) {
  //   this.selectedFormAuthentic = event;
  // }

  /** Metodo para crear un usuario con laravel */
  // async onRegisterUser() {
  //   this.spinner.show();
  //   if (this.userRegisterFormGroup.dirty && this.userRegisterFormGroup.valid) {
  //     this.formRegister.name = this.userRegisterFormGroup.value.fullName;
  //     this.formRegister.email = this.userRegisterFormGroup.value.email;
  //     this.formRegister.password = this.userRegisterFormGroup.value.password;
  //     this.formRegister.password_confirmation = this.userRegisterFormGroup.value.confirmPassword;
  //     try {
  //       await this.authService.register(this.formRegister).subscribe((resp: ResponseApi) => {
  //         if (resp.status === 1) {
  //           this.spinner.hide();
  //           this.authService.saveToken(resp.data.access_token);
  //           this.authService.saveUser(resp.data.user);
  //           this.authService.loggedIn.next(true);
  //           this.authService.currentUserSubject.next(resp.data.user);
  //           this.messageService.alertSuccess(resp.msn);
  //           this.router.navigate(['/admin']);
  //         } else {
  //           this.spinner.hide();
  //           this.respError = resp.data;
  //           const dialogRef = this.dialog.open(ModalLoginComponent, { width: '500px', data: { data: this.respError } });
  //           dialogRef.afterClosed().subscribe(result => result);
  //         }
  //       });
  //     } catch (error) {
  //       this.spinner.hide();
  //       this.authService.handlerError(error);
  //       console.error('Error onRegisterUser en componente', error);
  //     }
  //   } else {
  //     this.spinner.hide();
  //     this.messageService.toastError(this.message);
  //   }
  // }

  /** Metodo para loguear un usuario con laravel */
  // async onLoginUser() {
  //   this.spinner.show();
  //   if (this.userLoginFormGroup.dirty && this.userLoginFormGroup.valid) {
  //     this.formRegister.email = this.userLoginFormGroup.value.email;
  //     this.formRegister.password = this.userLoginFormGroup.value.password;
  //     try {
  //       await this.authService.login(this.formRegister).subscribe((resp: ResponseApi) => {
  //         if (resp.status === 1) {
  //           this.spinner.hide();
  //           this.authService.saveToken(resp.data.access_token);
  //           this.authService.saveUser(resp.data.user);
  //           this.authService.loggedIn.next(true);
  //           this.authService.currentUserSubject.next(resp.data.user);
  //           this.messageService.alertSuccess(resp.msn);
  //           this.router.navigate(['/admin']);
  //         } else {
  //           this.spinner.hide();
  //           this.messageService.toastError(resp.msn);
  //         }
  //       });
  //     } catch (error) {
  //       this.spinner.hide();
  //       this.authService.handlerError(error);
  //       console.error('Error onLoginUser en componente', error);
  //     }
  //   } else {
  //     this.spinner.hide();
  //     this.messageService.toastError(this.message);
  //   }
  // }

  /** Funcion para loguearse con google */
  // async onGoogleLogin() {
  //   try {
  //     await this.authService.loginGoogle();
  //   } catch (error) {
  //     console.error('Error onGoogleLogin en componente', error);
  //   }
  // }

  /** Funcion para loguearse con facebook */
  // async onFacebookLogin() {
  //   try {
  //     await this.authService.loginFacebook();
  //   } catch (error) {
  //     console.error('Error onGoogleLogin en componente', error);
  //   }
  // }

  /**
   * Abre modal de politicas y terminos
   */
  // openDialog(modal: number) {
  //   let dialogRef: MatDialogRef<ModalTerminosComponent, any>
  //   switch (modal) {
  //     case 1:
  //       dialogRef = this.dialog.open(ModalTerminosComponent, {
  //         width: '1000px', data: {
  //           checkboxEmails: true
  //         }
  //       });
  //       break;
  //     case 2:
  //       dialogRef = this.dialog.open(ModalAutorizaDatosComponent, {
  //         width: '1000px', data: {
  //           checkboxEmails: true
  //         }
  //       });
  //       break;
  //     case 3:
  //       dialogRef = this.dialog.open(ModalPoliticaDatosComponent, {
  //         width: '1000px', data: {
  //           checkboxEmails: true
  //         }
  //       });        
  //       break;
  //     case 4:
  //       dialogRef = this.dialog.open(ModalAvisoPrivacidadComponent, {
  //         width: '1000px', data: {
  //           checkboxEmails: true
  //         }
  //       });       
  //       break;

  //     default:
  //       break;
  //   }
    
  //   dialogRef.afterClosed().subscribe(result => result);
  // }

}
