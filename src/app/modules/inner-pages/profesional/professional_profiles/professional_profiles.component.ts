import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoryPage } from '@shared/models/content-page';
import { ResponseApiContent } from '@shared/models/responseApi';

import { ContentWebService } from '@core/services/content-web/content-web.service';
import { MessageService } from '@core/services/message/message.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-blog-three-column',
  templateUrl: './professional_profiles.component.html',
  styleUrls: ['./professional_profiles.component.scss']
})
export class ProfessionalProfilesComponent implements OnInit {

  /** Variables globales ProfessionalProfilesComponent */
  tittle = 'Nuestros serviamigos';
  breadcrumbTittle = 'Perfiles serviamigos';
  messageNoProfessional = 'No existen serviamigos en este momento';
  categoryProfessional: CategoryPage[];
  listProfessionals: ResponseApiContent;
  MAX_NUMBER_OF_STARS = 5;
  rating = 0;

  private get numberOfFullStars(): number {
    return Math.floor(this.rating);
  }

  private get numberOfEmptyStars(): number {
    return this.MAX_NUMBER_OF_STARS - Math.ceil(this.rating);
  }

  get fullStars(): any[] {
    return Array(this.numberOfFullStars);
  }

  get emptyStars(): any[] {
    return Array(this.numberOfEmptyStars);
  }

  constructor(private contentWebService: ContentWebService, private spinner: NgxSpinnerService,
              private messageService: MessageService, private router: Router) {
    this.categoryProfessional = this.contentWebService.currentCategoryvalue;
    this.listProfessionals = this.contentWebService.currentProfessionalValue;
    this.getReviews();
  }

  ngOnInit(): void {
  }

  async getReviews() {
    await this.contentWebService.currentProfessionalValue.data.forEach(element => {
      this.rating = element.calification;
      element.fullStars = this.fullStars;
      element.emptyStars = this.emptyStars;
    });
  }

  onClickLast(page) {
    this.contentWebService.getListProfessional(page);
  }

  onClickFirst(page) {
    this.contentWebService.getListProfessional(page);
  }

  onClickDetailProfessional(id) {
    this.router.navigate(['/professional_profile/', id]);
  }


  onClickPerCategory(event) {
    this.spinner.show();
    const json = { idCategory: event.value };
    this.contentWebService.getListDetailProfessional(json).subscribe((resp: ResponseApiContent) => {
      if (resp.status === 1) {
        resp.data.forEach(element => {
          this.rating = element.calification;
          element.fullStars = this.fullStars;
          element.emptyStars = this.emptyStars;
        });
        this.listProfessionals = resp;
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.messageService.toastError(resp.msn);
      }
    }, (error) => {
      this.spinner.hide();
      this.messageService.toastError(error);
      console.error('Error onClickPerCategory en componente profesional', error);
    });
  }


}
