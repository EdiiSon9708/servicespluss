/** Componentes para utilizar la pagina */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';



// importar locales
import localeEn from '@angular/common/locales/en';
import localeEsCo from '@angular/common/locales/es-CO';

/** Interceptor de autenticación para mantener el token en el header */
import { AuthInterceptorService } from '@shared/interceptor/auth-interceptor.service';

/** Modulo donde trae el scroll */
import { CoreModule } from '@core/core.module';

/** Entorno para autenticarse con Google y Facebook */
import { environment } from '@src/environments/environment';

/** Librería para utilizar autenticación con facebook y gmail */
import { GoogleLoginProvider, FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';

/** Modulo de spinner en toda la pagina */
import { NgxSpinnerModule } from 'ngx-spinner';

// registrar los locales con el nombre que quieras utilizar a la hora de proveer
registerLocaleData(localeEn, 'en');
registerLocaleData(localeEsCo, 'es-Co');


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SocialLoginModule,
    HttpClientModule,
    NgxSpinnerModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production})
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.configDB.endpointGoogle),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.configDB.endpointFacebook),
          }
        ],
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: LOCALE_ID, useValue: 'es-Co'
    },
    NgxSpinnerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
