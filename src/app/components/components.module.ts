/** Componentes para utilizar la pagina */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Componentes internos de las paginas en las que se navega */
import { AboutComponent } from '@components/about/about.component';
import { MyServiceComponent } from '@components/my-service/my-service.component';
import { WelcomeComponent } from '@components/welcome/welcome.component';
import { AboutHomeComponent } from '@components/about-home/about-home.component';
import { HowToUseHomeComponent } from '@components/how-to-use-home/how-to-use-home.component';
import { AnalyticsComponent } from '@components/analytics/analytics.component';
import { OurCategoriesComponent } from '@components/our-categories/our-categories.component';
import { DownloadAppComponent } from '@components/download-app/download-app.component';
import { ReviewsComponent } from '@components/reviews/reviews.component';
import { FaqComponent } from '@components/faq/faq.component';
import { ContactOneComponent } from '@components/contact/contact.component';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb/breadcrumb.component';
import { HowToUseComponent } from '@components/how-to-use/how-to-use.component';
import { QuotationComponent } from '@components/quotation/quotation.component';
import { ModalsComponent } from '@components/modals/modal-list-category/modals.component';
import { ProfileComponent } from '@components/profile/profile.component';
import { ModalTerminosComponent } from '@components/modals/modal-terminos/modal-terminos.component';
import { BreadcrumbAdminComponent } from '@components/breadcrumb/breadcrumb-admin/breadcrumb-admin.component';
import { NotificationComponent } from '@components/notificatns/notification.component';
import { ModalLoginComponent } from '@components/modals/modal-login/modal-login.component';
import { ModalUbicationComponent } from '@components/modals/modal-ubication/modal-ubication.component';
import { ModalServiceComponent } from '@components/modals/modal-service/modal-service.component';
import { ModalReviewsComponent } from '@components/modals/modal-reviews/modal-reviews.component';

/** ngx-carousel */
import { CarouselModule } from 'ngx-bootstrap/carousel';

/** Componentes de material angular */
import { MaterialModule } from '@modules/module-material-angular/material.module';

/** Librerias de ngx angular, ngx-bootstrap */
import { NgxModule } from '@modules/module-ngx-angular/ngx.module';

/** Entorno de desarrollo */
import { environment } from '@src/environments/environment';

/** Pipe para seguridad en URL externas */
import { SafePipePipe } from '@shared/pipe/safe-pipe.pipe';

/** Librería de mapa */
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { ModalAutorizaDatosComponent } from './modals/modal-autoriza-datos/modal-autoriza-datos.component';
import { ModalPoliticaDatosComponent } from './modals/modal-politica-datos/modal-politica-datos.component';
import { ModalAvisoPrivacidadComponent } from './modals/modal-aviso-privacidad/modal-aviso-privacidad.component';
import { LoginComponent } from './forms/login/login.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ModalImagesServiceComponent } from './modals/modal-images-service/modal-images-service.component';
import { ChangeImageProfileComponent } from './modals/change-image-profile/change-image-profile.component';
import { CarouselModule as CarouselModuleOwl  } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    WelcomeComponent,
    AboutHomeComponent,
    HowToUseHomeComponent,
    AnalyticsComponent,
    OurCategoriesComponent,
    DownloadAppComponent,
    ReviewsComponent,
    FaqComponent,
    ContactOneComponent,
    BreadcrumbComponent,
    AboutComponent,
    HowToUseComponent,
    QuotationComponent,
    ModalsComponent,
    MyServiceComponent,
    ProfileComponent,
    ModalTerminosComponent,
    BreadcrumbAdminComponent,
    NotificationComponent,
    ModalLoginComponent,
    ModalUbicationComponent,
    ModalServiceComponent,
    ModalReviewsComponent,
    SafePipePipe,
    ModalAutorizaDatosComponent,
    ModalPoliticaDatosComponent,
    ModalAvisoPrivacidadComponent,
    LoginComponent,
    ModalImagesServiceComponent,
    ChangeImageProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatRadioModule, 
    MatCheckboxModule,   
    NgxModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: environment.configDB.endpointMaps,
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule,
    CarouselModuleOwl,
    CarouselModule.forRoot()
  ],
  exports: [
    WelcomeComponent,
    AboutHomeComponent,
    HowToUseHomeComponent,
    AnalyticsComponent,
    OurCategoriesComponent,
    DownloadAppComponent,
    ReviewsComponent,
    FaqComponent,
    ContactOneComponent,
    BreadcrumbComponent,
    AboutComponent,
    HowToUseComponent,
    QuotationComponent,
    ModalsComponent,
    MyServiceComponent,
    ProfileComponent,
    ModalTerminosComponent,
    BreadcrumbAdminComponent,
    NotificationComponent,
    ModalLoginComponent,
    ModalServiceComponent,
    SafePipePipe,
    ModalAutorizaDatosComponent,
    ModalPoliticaDatosComponent,
    ModalAvisoPrivacidadComponent,
    LoginComponent,
    ModalImagesServiceComponent
  ]
})
export class ComponentsModule { }

