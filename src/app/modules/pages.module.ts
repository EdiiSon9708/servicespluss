/** Componentes para utilizar la pagina */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Routing Module of pages */
import { PagesRoutingModule } from './pages-routing.module';

/** Paginas internas donde se navega por la pagina general */
import { ThemeComponent } from '@app/modules/inner-pages/home/theme.component';
import { QuotationPagesComponent } from '@app/modules/inner-pages/quotation-pages/quotation-pages.component';
import { ProfessionalProfilesComponent } from '@app/modules/inner-pages/profesional/professional_profiles/professional_profiles.component';
import { BlogDetailsLeftSidebarComponent } from '@app/modules/inner-pages/profesional/details_profesional/details_profesional.component';
import { FaqPageComponent } from '@app/modules/inner-pages/faq-page/faq-page.component';
import { ReviewsPageComponent } from '@app/modules/inner-pages/reviews-page/reviews-page.component';
import { AboutPageComponent } from '@app/modules/inner-pages/about-page/about-page.component';
import { ContactPageComponent } from '@app/modules/inner-pages/contact-page/contact-page.component';
import { LoginPageComponent } from '@app/modules/inner-pages/login-page/login-page.component';

/** Modulo donde trae todos los componentes */
import { ComponentsModule } from '@components/components.module';
/** Componentes de material angular */
import { MaterialModule } from '@app/modules/module-material-angular/material.module';

/** Modulo donde trae header y footer */
import { CoreModule } from '@app/core/core.module';
import { AdminComponent } from './inner-pages/admin/admin.component';

import { CarouselModule } from 'ngx-bootstrap/carousel';

/** Entorno de desarrollo */
import { environment } from '@src/environments/environment';

/** Librería de mapa */
import { AgmCoreModule } from '@agm/core';
import { LoginRegisterComponent } from './inner-pages/login-register/login-register.component';
import { TerminosComponent } from './inner-pages/terminos/terminos.component';
import { RestorePasswordComponent } from './inner-pages/restore-password/restore-password.component';
import { CheckMailComponent } from './inner-pages/check-mail/check-mail.component';

import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';



@NgModule({
  declarations: [
    ThemeComponent,
    QuotationPagesComponent,
    ProfessionalProfilesComponent,
    BlogDetailsLeftSidebarComponent,
    FaqPageComponent,
    ReviewsPageComponent,
    AboutPageComponent,
    ContactPageComponent,
    LoginPageComponent,
    AdminComponent,
    LoginRegisterComponent,
    TerminosComponent,
    RestorePasswordComponent,
    CheckMailComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    CoreModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: environment.configDB.endpointMaps,
      libraries: ['places']
    }),
    CarouselModule.forRoot()
  ],
  providers: [  
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    
  ],
  exports: []
})
export class PagesModule { }
