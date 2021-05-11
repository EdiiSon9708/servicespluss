import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Comments } from '@shared/models/form-page';
import { ProfessionalPage } from '@shared/models/content-page';
import { User } from '@shared/models/user';
import { ResponseApiContent } from '@shared/models/responseApi';

import { AuthService } from '@core/services/auth/auth.service';
import { MessageService } from '@core/services/message/message.service';
import { FormsPageService } from '@core/services/forms-page/forms-page.service';
import { ContentWebService } from '@core/services/content-web/content-web.service';

import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-blog-details-left-sidebar',
  templateUrl: './details_profesional.component.html',
  styleUrls: ['./details_profesional.component.scss']
})
export class BlogDetailsLeftSidebarComponent implements OnInit {

  /** Variables globales  */
  tittle = 'Acerca de nuestro serviamigo';
  breadcrumbTittle = 'Detalles del serviamigo';
  breadcrumbTittlePrevious = 'Perfiles serviamigos';
  dataUser: User;
  commentsForm: FormGroup;
  formComments: Comments = new Comments();
  detailProfessional: ProfessionalPage[];
  listProfessional: ProfessionalPage[];
  MAX_NUMBER_OF_STARS = 5;
  rating = 0;
  ratingProfessional = 0;
  idProf: string;


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

  private get numberOfFullStarsUnique(): number {
    return Math.floor(this.ratingProfessional);
  }

  private get numberOfEmptyStarsUnique(): number {
    return this.MAX_NUMBER_OF_STARS - Math.ceil(this.ratingProfessional);
  }

  get fullStarsUnique(): any[] {
    return Array(this.numberOfFullStarsUnique);
  }

  get emptyStarsUnique(): any[] {
    return Array(this.numberOfEmptyStarsUnique);
  }

listCategory = [
  {
    id: '1',
    name: 'Albañil',
    subcategory: [
      { name: 'Techos' },
      { name: 'Muros' },
      { name: 'Terrazas' },
      { name: 'Escaleras' }
    ]
  },
  {
    id: '2',
    name: 'Arquitecto',
    subcategory: [
      { name: 'Planos' },
      { name: 'Construcción' },
      { name: 'BBQ' }
    ]
  },
  {
    id: '3',
    name: 'Autos',
    subcategory: [
      { name: 'Reparación' },
      { name: 'Limpieza' },
      { name: 'Mantenimientos' },
      { name: 'Grúas' }
    ]
  },
  {
    id: '4',
    name: 'Gas',
    subcategory: [
      { name: 'Tubos' },
      { name: 'Calefacción' }
    ]
  },
  {
    id: '5',
    name: 'Técnico',
    subcategory: [
      { name: 'Computadores' },
      { name: 'Impresoras' },
      { name: 'Antenas' }
    ]
  },
  {
    id: '6',
    name: 'Pintor',
    subcategory: [
      { name: 'Pintura' },
      { name: 'Revestimientos' },
      { name: 'Humedad' },
      { name: 'Otros trabajos' }
    ]
  }
];

constructor(private formBuilder: FormBuilder, private authService: AuthService, private messageService: MessageService,
            private router: Router, private formsPageService: FormsPageService, private spinner: NgxSpinnerService,
            private activatedRoute: ActivatedRoute, private contentWebService: ContentWebService) {
  this.dataUser = this.authService.currentUservalue;
}

ngOnInit(): void {
  this.initFormCommets();
  this.detailProfessionals();
  this.fiveLastProfessionals();
}

/** Obtener calificación de las personas que le hicieron los comentarios al profesional */
async getReviews(data) {
  await data[0].dataTestimonio.forEach(element => {
    this.rating = element.estrellas;
    element.fullStars = this.fullStars;
    element.emptyStars = this.emptyStars;
  });
}

/** Formulario para crear comentario a profesional */
initFormCommets() {
  this.commentsForm = this.formBuilder.group({
    messageComment: [null, Validators.required],
    calificationComment: [null, Validators.required]
  });
}

/** Metodo para mostrar detalle de profesional */
detailProfessionals() {
  this.spinner.show();
  this.idProf = this.activatedRoute.snapshot.paramMap.get('id');
  const json = { idProfessional: this.idProf };
  this.contentWebService.getListDetailProfessional(json).subscribe((resp: ResponseApiContent) => {
    if (resp.status === 1) {
      this.detailProfessional = resp.data;
      this.ratingProfessional = resp.data[0].calification;
      console.log(this.detailProfessional);
      this.getReviews(this.detailProfessional);
      this.spinner.hide();
    } else {
      this.spinner.hide();
      this.messageService.toastError(resp.msn);
    }
  }, (error) => {
    this.spinner.hide();
    this.messageService.toastError(error);
    console.error('Error detailProfessionals en componente detail_profesional', error);
  });
}

/** Trae los 5 ultimos profesionales registrados */
fiveLastProfessionals() {
  this.spinner.show();
  const json = { lastProfessionals: 5 };
  this.contentWebService.getListDetailProfessional(json).subscribe((resp: ResponseApiContent) => {
    if (resp.status === 1) {
      this.listProfessional = resp.data;
      this.spinner.hide();
    } else {
      this.spinner.hide();
      this.messageService.toastError(resp.msn);
    }
  }, (error) => {
    this.spinner.hide();
    this.messageService.toastError(error);
    console.error('Error fiveLastProfessionals en componente detail_profesional', error);
  });
}

/** Metodo para crear comentario a profesional */
async onsubmitComment() {
  if (this.commentsForm.invalid) {
    if (this.dataUser) {
      const message = 'Campo obligatorio';
      this.messageService.toastError(message);
      return;
    } else {
      this.router.navigate(['/login']);
    }
  } else {
    this.spinner.show();
    this.formComments.idProfessional = this.idProf;
    this.formComments.message = this.commentsForm.value.messageComment;
    this.formComments.calification = this.commentsForm.value.calificationComment;
    try {
      await this.formsPageService.createComment(this.formComments).subscribe(resp => {
        if (resp.status === 1) {
          this.spinner.hide();
          this.commentsForm.reset();
          this.messageService.alertSuccess(resp.msn);
          this.detailProfessionals();
        } else {
          this.spinner.hide();
          console.warn(resp.data);
          this.messageService.toastError(resp.msn);
        }
      });
    } catch (error) {
      this.spinner.hide();
      this.formsPageService.handlerError(error);
      console.error('Error onsubmitComment en componente detalle profesional', error);
    }
  }
}

/** mostrar detalle de otro profesional */
realodPage(id) {
  this.router.navigateByUrl('/professional_profile', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/professional_profile/', id]);
  });
}

}
