/** Componentes para utilizar la pagina */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Paginas internas donde se navega por la pagina general */
import { ThemeComponent } from '@app/modules/inner-pages/home/theme.component';
import { QuotationPagesComponent } from '@app/modules/inner-pages/quotation-pages/quotation-pages.component';
import { ProfessionalProfilesComponent } from '@app/modules/inner-pages/profesional/professional_profiles/professional_profiles.component';
import { BlogDetailsLeftSidebarComponent } from '@app/modules/inner-pages/profesional/details_profesional/details_profesional.component';
import { FaqPageComponent } from '@app/modules/inner-pages/faq-page/faq-page.component';
import { ReviewsPageComponent } from '@app/modules/inner-pages/reviews-page/reviews-page.component';
import { AboutPageComponent } from '@app/modules/inner-pages/about-page/about-page.component';
import { ContactPageComponent } from '@app/modules/inner-pages/contact-page/contact-page.component';
import { AdminComponent } from './inner-pages/admin/admin.component';

import { AdminGuard } from '../shared/guards/admin/admin.guard';

/** Rutas de lazyloading */
const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: ThemeComponent},
  {path: 'quotation', component: QuotationPagesComponent},
  {path: 'professional_profile', component: ProfessionalProfilesComponent},
  {path: 'professional_profile/:id', component: BlogDetailsLeftSidebarComponent},
  {path: 'faq', component: FaqPageComponent},
  {path: 'reviews', component: ReviewsPageComponent},
  {path: 'about', component: AboutPageComponent},
  {path: 'contact', component: ContactPageComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
