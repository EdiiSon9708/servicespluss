import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageService } from '@src/app/core/services/message/message.service';
import { ResponseApi } from '@shared/models/authentication';
import { Register } from '@src/app/shared/models/user';
import { NgxSpinnerService } from 'ngx-spinner';

import { AuthService } from '@src/app/core/services/auth/auth.service';

import { ModalAutorizaDatosComponent } from '../../modals/modal-autoriza-datos/modal-autoriza-datos.component';
import { ModalAvisoPrivacidadComponent } from '../../modals/modal-aviso-privacidad/modal-aviso-privacidad.component';
import { ModalPoliticaDatosComponent } from '../../modals/modal-politica-datos/modal-politica-datos.component';
import { ModalTerminosComponent } from '../../modals/modal-terminos/modal-terminos.component';
import { ModalLoginComponent } from '../../modals/modal-login/modal-login.component';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message = 'Campos obligatorios por confirmar';
  userLoginFormGroup: FormGroup;
  userRegisterFormGroup: FormGroup;
  userTerminosFormGroup: FormGroup;
  userRestorepassword: FormGroup;
  userPassword:FormGroup;
  @Input() selectedFormAuthentic = 0;
  @Input() tokenRestorePassword=''
  formLogin: Register = new Register();
  formRegister: Register = new Register();
  formTerminos: Register = new Register();

  hide = true;
  respError: any;

  error_messages = {
     'password': [
      { type: 'required', message: 'Campo Requerido.' },
      { type: 'minlength', message: 'Minimo 6 caracteres.' },
      { type: 'maxlength', message: 'Maximo 30 caracteres.' },
      // { type: 'pattern', message: 'debe contener letras numeros y caracteres especiales'}
    ],
    'password_validate': [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'minlength', message: 'Minimo 6 caracteres' },
      { type: 'maxlength', message: 'Maximo 30 caracteres.' },
      { type: 'password', message: 'Las contraseña no coincide.' },
    ],
  }
  

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router,
    private spinner: NgxSpinnerService, private messageService: MessageService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initFormLogin();
    this.initFormRegister();
    this.initFormTerminos();
    this.initFormRestorePassword();
    this.formRestorePassword();
    console.log("ngonini",this.selectedFormAuthentic)
  }

  /** Inicializa el el formulario de registro de usuarios */
  initFormLogin() {
    this.userLoginFormGroup = this.formBuilder.group({
      email: ['',  [Validators.required,Validators.email]],
      password: ['', Validators.required],
    });
  }
   /** Inicializa el el formulario de registro de usuarios */
   initFormRegister() {
    this.userRegisterFormGroup = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],  
      termsAndCondit: ['', Validators.required],
      termsAndCondit1: ['', Validators.required],
      termsAndCondit2: ['', Validators.required],
      idPerfil:[1]
    // termsAndCondit3: ['', Validators.required],   
    }
    
    );
  }
  /** Inicializa el el formulario de terminos y condiciones */
 initFormTerminos() {
  this.userTerminosFormGroup = this.formBuilder.group({     
    termsAndCondit: ['', Validators.required],
    termsAndCondit1: ['', Validators.required],
    termsAndCondit2: ['', Validators.required],
    // termsAndCondit3: ['', Validators.required],
  });
  } 


  //Formularion para restaurar la contraseña
  formRestorePassword() {
    this.userPassword = new FormGroup({   
      newPass:new FormControl('',  [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]),
      newPassConfirm: new FormControl('',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]),
      tokenPassword:new FormControl(this.tokenRestorePassword,[]),
    },{ validators: this.sonIguales('newPass', 'newPassConfirm')  });
  } 

  /**
   * valida que las contraseñas sean iguales
   * @param campo1 
   * @param campo2 
   */
  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      if(pass2!='' && pass1!=''){

        if (pass1 === pass2) {
          return null;
        }
  
        return {
          sonIguales: true
        }
      }
    }
  }
  




    /** Inicializa el el formulario de recuperacontraseña */
 initFormRestorePassword() {
  this.userRestorepassword = this.formBuilder.group({     
    email: ['', Validators.required],
  });
  } 


   /**
   * Funcion que hace cambio de login a register o recuperar contraseña
   * @param event Valor del dato traido del evento es numerico.
   */
  changeForm(event) {
    console.log(event);
    this.selectedFormAuthentic = event;
  }
  /** Metodo para crear un usuario con laravel */
  async onRegisterUser() {
    this.spinner.show();
    if (this.userRegisterFormGroup.dirty && this.userRegisterFormGroup.valid) {
      this.formRegister.name = this.userRegisterFormGroup.value.fullName;
      this.formRegister.email = this.userRegisterFormGroup.value.email;
      this.formRegister.password = this.userRegisterFormGroup.value.password;
      this.formRegister.password_confirmation = this.userRegisterFormGroup.value.confirmPassword;
      this.formRegister.idPerfil=1;
      try {
        await this.authService.register(this.formRegister).subscribe((resp: ResponseApi) => {
          if (resp.status === 1) {
            this.spinner.hide();
            // this.authService.saveToken(resp.data.access_token);
            // this.authService.saveUser(resp.data.user);
            // this.authService.loggedIn.next(true);
            // this.authService.currentUserSubject.next(resp.data.user);
            this.messageService.alertSuccess(resp.msn);
            // this.router.navigate(['/admin']);

          } else {
            this.spinner.hide();
            this.respError = resp.data;
            this.authService.handlerError(this.respError);
            // const dialogRef = this.dialog.open(ModalLoginComponent, { width: '500px', data: { data: this.respError } });
            // dialogRef.afterClosed().subscribe(result => result);
          }
          this.selectedFormAuthentic=0;
        });
      } catch (error) {
        this.spinner.hide();
        this.authService.handlerError(error);
        console.error('Error onRegisterUser en componente', error);
      }
    } else {
      this.spinner.hide();
      this.messageService.toastError(this.message);
    }
  }
  /** Metodo para loguear un usuario con laravel */
  async onLoginUser() {
    this.spinner.show();
    if (this.userLoginFormGroup.dirty && this.userLoginFormGroup.valid) {
      this.formRegister.email = this.userLoginFormGroup.value.email;
      this.formRegister.password = this.userLoginFormGroup.value.password;
      try {
        await this.authService.login(this.formRegister).subscribe((resp: ResponseApi) => {
          if (resp.status === 1) {
            this.spinner.hide();
            this.authService.saveToken(resp.data.access_token);
            this.authService.saveUser(resp.data.user);
            this.authService.loggedIn.next(true);
            this.authService.currentUserSubject.next(resp.data.user);
            this.messageService.alertSuccess(resp.msn);
            this.router.navigate(['/admin']);
          } else {
            this.spinner.hide();
            this.messageService.toastError(resp.msn);
          }
        });
      } catch (error) {
        this.spinner.hide();
        this.authService.handlerError(error);
        console.error('Error onLoginUser en componente', error);
      }
    } else {
      this.spinner.hide();
      this.messageService.toastError(this.message);
    }
  }

  /** Funcion para loguearse con google */
  async onGoogleLogin() {
    try {
      await this.authService.loginGoogle();
    } catch (error) {
      console.error('Error onGoogleLogin en componente', error);
    }
  }

  /** Funcion para loguearse con facebook */
  async onFacebookLogin() {
    try {
      await this.authService.loginFacebook();
    } catch (error) {
      console.error('Error onGoogleLogin en componente', error);
    }
  }

  /**
   * Abre modal de politicas y terminos
   */
  openDialog(modal: number) {
    let dialogRef: MatDialogRef<ModalTerminosComponent, any>
    switch (modal) {
      case 1:
        dialogRef = this.dialog.open(ModalTerminosComponent, {
          width: '1000px', data: {
            checkboxEmails: true
          }
        });
        break;
      case 2:
        dialogRef = this.dialog.open(ModalAutorizaDatosComponent, {
          width: '1000px', data: {
            checkboxEmails: true
          }
        });
        break;
      case 3:
        dialogRef = this.dialog.open(ModalPoliticaDatosComponent, {
          width: '1000px', data: {
            checkboxEmails: true
          }
        });        
        break;
      case 4:
        dialogRef = this.dialog.open(ModalAvisoPrivacidadComponent, {
          width: '1000px', data: {
            checkboxEmails: true
          }
        });       
        break;

      default:
        break;
    }
    
    dialogRef.afterClosed().subscribe(result => result);
  }
  restorePassword(request){
    console.log(request);
    // event.preventDefault();
    
    console.log(this.userRestorepassword);
    if (this.userRestorepassword.valid) {
      console.log(this.userRestorepassword.value);
      
      this.authService.restorePassword(this.userRestorepassword.value);
      this.selectedFormAuthentic=0;
      
    } else {
      this.userRestorepassword.markAllAsTouched();
    }
  }

  chagePassword(request){
    console.log(request);
    // event.preventDefault();
    
    // console.log(this.userRestorepassword);
    if (this.userPassword.valid) {
    //   console.log(this.userRestorepassword.value);
      
      this.authService.changePassword(this.userPassword.value);
      
    } else {
      this.userRestorepassword.markAllAsTouched();
    }
  }

  AcceptTermins(){
    console.log(this.userTerminosFormGroup.valid);
    if(this.userTerminosFormGroup.valid){
      this.authService.acepptTerminos({});
    }else{

    }

  }
}
