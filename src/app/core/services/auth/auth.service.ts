import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

/** Servicio de alert con sweealert2 */
import { MessageService } from '@core/services/message/message.service';
import { LocalServiceService } from '@core/services/localService/local-service.service';

/** env. donde se encuentra las URL de conección a las API */
import { environment } from '@src/environments/environment';

/** Modelos */
import { ResponseApi } from '@shared/models/authentication';
import { User } from '@shared/models/user';

/** Librería para verificar si el token se encuentra expirado */
import { JwtHelperService } from '@auth0/angular-jwt';

/** Librería para utilizar autenticación con facebook y gmail */
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalLoginComponent } from '../../../components/modals/modal-login/modal-login.component';
import { MatDialog } from '@angular/material/dialog';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** Variables globales */
  messageSocialNetwork = 'El usuario canceló el inicio de sesión.';
  helper = new JwtHelperService();
  loggedIn = new BehaviorSubject<boolean>(false);
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  isTokenExpired: boolean;
  respError
  user:User;

  urlLaravel = `${environment.configDB.apiLaravel}/auth`;
  urlLaravelPage = `${environment.configDB.apiLaravel}/page`;

  constructor(private messageService: MessageService, private spinner: NgxSpinnerService, private router: Router,
              private socialAuthService: SocialAuthService, private httpClient: HttpClient,
              private localService: LocalServiceService,public dialog: MatDialog) {
    this.checkToken();
    this.currentUserSubject = new BehaviorSubject<User>(
      this.localService.getJsonValue('currentUser')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Header de la pagina
   */
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  /**
   * Obtiene el dato si está logueado en boolean
   */
  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  /**
   * Obtiene el dato de los usuarios
   */
  get currentUservalue(): User {
    return this.currentUserSubject.value;
  }

  /**
   * Metodo de registrar un usuario bajo en metodo de APIs con Laravel
   * @param name nombre del usuario
   * @param email correo electronico del usuario
   * @param password contraseña del usuario
   * @param password_confirmation confirmación de la contraseña
   */
  // tslint:disable-next-line: variable-name
  register(json): Observable<ResponseApi> {
    try {
      return this.httpClient.post<ResponseApi>(`${this.urlLaravel}/register`, json);
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error register en service', error);
    }
  }

  /**
   * Metodo de login de un usuario bajo en metodo de APIs con Laravel
   * @param email correo electronico del usuario
   * @param password contrseña del usuario
   */
  login(json) {
    try {
      return this.httpClient.post<ResponseApi>(`${this.urlLaravel}/login`, json);
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error login en service', error);
    }
  }

  /**
   * Login de Facebook el cual utiliza la librería angularx-social-login
   */
  async loginFacebook() {
    this.spinner.show();
    try {
      const tokenFacebook = await this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
      console.log(tokenFacebook);
      this.oathLaravelFacebook(tokenFacebook);
    } catch (error) {
      this.spinner.hide();
      this.handlerError(this.messageSocialNetwork);
      console.error('Error loginFacebook en service', error);
    }
  }

  /**
   * Login de google el cual utiliza la librería angularx-social-login
   */
  async loginGoogle() {
    this.spinner.show();
    try {
      const tokenGoogle = await this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.oathLaravel(tokenGoogle.idToken);
    } catch (error) {
      this.spinner.hide();
      this.handlerError(this.messageSocialNetwork);
      console.error('Error loginGoogle en service', error);
    }
  }

  /**
   * Metodo de autenticación de un usuario bajo en metodo de APIs con Laravel para Google y Facebook
   * @param tokenFG token de Facebook o Google
   */
  async oathLaravelFacebook(requestService) {
    this.spinner.show();
    const request = { idPerfil:1,name:requestService.name,email: requestService.email,foto:requestService.photoUrl,id:requestService.id };
    try {
      await this.httpClient.post<ResponseApi>(`${this.urlLaravel}/facebook`, request).subscribe((resp: ResponseApi) => {
        this.spinner.hide();
        if (resp.status === 1) {
          this.spinner.hide();
          this.saveToken(resp.data.access_token);
          this.saveUser(resp.data.user);
          this.loggedIn.next(true);
          this.currentUserSubject.next(resp.data.user);
          this.messageService.alertSuccess(resp.msn);
          if(resp.data.user.aceptaTerminos==0){

            this.router.navigate(['/terminos']);
            return ;
          }
          this.router.navigate(['/admin']);
        } else {
          this.messageService.toastError(resp.msn);
        }
      });
    } catch (error) {
      this.handlerError(error);
      console.error('Error oathLaravel en service', error);
    }
  }
  /**
   * Metodo de autenticación de un usuario bajo en metodo de APIs con Laravel para Google y Facebook
   * @param tokenFG token de Facebook o Google
   */
  async oathLaravel(tokenFG) {
    this.spinner.show();
    const token = { token: tokenFG,idPerfil:1 };
    try {
      await this.httpClient.post<ResponseApi>(`${this.urlLaravel}/google`, token).subscribe((resp: ResponseApi) => {
        this.spinner.hide();
        if (resp.status === 1) {
          this.spinner.hide();
          this.saveToken(resp.data.access_token);
          this.saveUser(resp.data.user);
          this.loggedIn.next(true);
          this.currentUserSubject.next(resp.data.user);
          this.messageService.alertSuccess(resp.msn);
          if(resp.data.user.aceptaTerminos==0){

            this.router.navigate(['/terminos']);
            return ;
          }
          this.router.navigate(['/admin']);
        } else {
          this.messageService.toastError(resp.msn);
        }
      });
    } catch (error) {
      this.handlerError(error);
      console.error('Error oathLaravel en service', error);
    }
  }
  
  changeImageUser(data) {
    this.spinner.show();
    let headersNew:HttpHeaders = new HttpHeaders();
    headersNew.append('Content-Type', 'multipart/form-data');
    try {
      return this.httpClient.post<ResponseApi>(`${this.urlLaravelPage}/svImgsPerfil`, data,{ headers: headersNew }).subscribe((response)=>{
        
        this.spinner.hide();
        if(response.status==1){
          // this.user=
          this.saveUser(response.data.user);
          this.currentUserSubject.next(response.data.user);
        }
        console.log(response);
      });
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error login en service', error);
    }
  }

  /**
   * Metodo para verificar el token de cambio de contraseña
   * @param token token de Facebook o Google
   */
  verifyTokenRetorePassword(request):Observable<ResponseApi> {
    this.spinner.show();
    try {
      return  this.httpClient.post<ResponseApi>(`${this.urlLaravelPage}/validaTokenPass`, request);
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error oathLaravel en service', error);
    }
  }
  /**
   * Metodo para restablecer la contraseña
   * @param email email para enviar a restablecer la contraseña
   */
  async restorePassword(request) {
    this.spinner.show();
    try {
      await this.httpClient.post<ResponseApi>(`${this.urlLaravelPage}/PassReset`, request).subscribe((response)=>{
         this.spinner.hide();
            console.log(response);
            this.messageService.alertSuccess(response.msn);
      });
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error oathLaravel en service', error);
    }
  }

  /**
   * Metodo para restablecer la contraseña
   * @param email email para enviar a restablecer la contraseña
   */
  changePassword(request) {
    this.spinner.show();
    try {
      return  this.httpClient.post<ResponseApi>(`${this.urlLaravelPage}/reset`, request).subscribe((response)=>{
        this.spinner.hide();
            console.log(response);
            if(response.status==1){
              this.messageService.toastError(response.msn);
            }
            this.messageService.alertSuccess(response.msn);
            this.router.navigate(['/admin']);
      });
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error oathLaravel en service', error);
    }
  }

  /**
   * Metodo para restablecer la contraseña
   * @param email email para enviar a restablecer la contraseña
   */
  acepptTerminos(request) {
    this.spinner.show();
    try {
      return  this.httpClient.post<ResponseApi>(`${this.urlLaravelPage}/AcceptTerms`, request).subscribe((response)=>{
        this.spinner.hide();
            console.log(response);
            if(response.status==1){
              this.messageService.toastError(response.msn);
            }
            this.messageService.alertSuccess(response.msn);
            this.router.navigate(['/admin']);
      });
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error oathLaravel en service', error);
    }
  }

  
  /**
   * Metodo para validar el correo
   * @param email email para enviar a restablecer la contraseña
   */
  checkMail(request) {
    this.spinner.show();
    try {
      return  this.httpClient.post<ResponseApi>(`${this.urlLaravelPage}/validaTokenActivateAccount`, request).subscribe((resp)=>{
        // this.spinner.hide();
        if (resp.status === 1) {
          this.spinner.hide();
          this.saveToken(resp.data.access_token);
          this.saveUser(resp.data.user);
          this.loggedIn.next(true);
          this.currentUserSubject.next(resp.data.user);
          this.messageService.alertSuccess(resp.msn);
          this.router.navigate(['/admin']);
        } else {
          this.spinner.hide();
          this.respError = resp.data;
          const dialogRef = this.dialog.open(ModalLoginComponent, { width: '500px', data: { data: this.respError } });
          dialogRef.afterClosed().subscribe(result => result);
        }
      });
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error oathLaravel en service', error);
    }
  }

  /**
   * Metodo de logOut de un usuario bajo en metodo de APIs
   */
  logOut() {
    try {
      return this.httpClient.post<ResponseApi>(`${this.urlLaravel}/logout`, null, { headers: this.headers });
    } catch (error) {
      console.warn('User not logged');
    }
  }

  /**
   * Obtener token del localstorage y tiene un observador,
   * que pertenece al plugin @auth0/angular-jwt para estar vigilando si el token vence
   */
  private checkToken(): void {
    const userToken = this.localService.getJsonValue('token');
    const isExpired = this.helper.isTokenExpired(userToken);
    this.isTokenExpired = isExpired;
    this.isTokenExpired ? this.logOut() : this.loggedIn.next(true);
    this.isTokenExpired ? this.deleteToken() : this.loggedIn.next(true);
    if (this.isTokenExpired === true) {
      return this.loggedIn.next(false);
    }
  }

  /**
   * Metodo que almacena el token en el localstorage
   * @param token token enviado en la autenticación con Laravel
   */
  saveToken(token: string): void {
    this.localService.setJsonValue('token', token);
  }

  /**
   * Metodo que almacena los datos del usuario en el localstorage
   * @param userData usuario enviado en la autenticación con Laravel
   */
  saveUser(userData: User): void {
    this.localService.setJsonValue('currentUser', userData);
  }

  /**
   * Elimina token en el localstorage
   */
  deleteToken(): void {
    this.localService.removeItem('token');
    this.localService.removeItem('currentUser');
  }

  /**
   * Obtiene los errores de la peticiones al servidor
   * @param err Información que obtiene de las peticiones HTTP
   */
  handlerError(err): Observable<never> {
    let errorMessage = 'Se produjo un error en el servidor';
    if (err) {
      errorMessage = `${err}`;
    }
    this.messageService.alertDanger(errorMessage);
    return throwError(errorMessage);
  }

}
