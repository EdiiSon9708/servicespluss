import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError, BehaviorSubject } from 'rxjs';

import { environment } from '@src/environments/environment';

import { MessageService } from '@core/services/message/message.service';
import { LocalServiceService } from '@core/services/localService/local-service.service';

import { ResponseApiContent } from '@shared/models/responseApi';
import { Analitic, CategoryPage, ContentPage, FaqPage, ReviewsPage, ThereAreTestimonial } from '@shared/models/content-page';

import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class ContentWebService {

  /** Variables globales */
  urlLaravel = `${environment.configDB.apiLaravel}/page`;
  currentContentSubject: BehaviorSubject<ContentPage[]>;
  currentCategorySubject: BehaviorSubject<CategoryPage[]>;
  currentFiveCategorySubject: BehaviorSubject<CategoryPage[]>;
  currentFaqSubject: BehaviorSubject<FaqPage[]>;
  currentReviewSubject: BehaviorSubject<ReviewsPage[]>;
  currentProfessionalSubject: BehaviorSubject<ResponseApiContent>;
  currentAnaliticSubject: BehaviorSubject<Analitic[]>;
  currentThereAreTestimonialSubject: BehaviorSubject<ThereAreTestimonial>;

  constructor(private httpClient: HttpClient, private spinner: NgxSpinnerService, private messageService: MessageService,
              private localService: LocalServiceService) {
    this.getInfoLocalStorage();
  }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  getInfoLocalStorage() {
    this.currentContentSubject = new BehaviorSubject<ContentPage[]>(
      this.localService.getJsonValue('content')
    );

    this.currentCategorySubject = new BehaviorSubject<CategoryPage[]>(
      this.localService.getJsonValue('category')
    );

    this.currentFiveCategorySubject = new BehaviorSubject<CategoryPage[]>(
      this.localService.getJsonValue('categoryFirst')
    );

    this.currentFaqSubject = new BehaviorSubject<FaqPage[]>(
      this.localService.getJsonValue('Faq')
    );

    this.currentReviewSubject = new BehaviorSubject<ReviewsPage[]>(
      this.localService.getJsonValue('reviews')
    );

    this.currentProfessionalSubject = new BehaviorSubject<ResponseApiContent>(
      this.localService.getJsonValue('professional')
    );

    this.currentAnaliticSubject = new BehaviorSubject<Analitic[]>(
      this.localService.getJsonValue('analitic')
    );

    this.currentThereAreTestimonialSubject = new BehaviorSubject<ThereAreTestimonial>(
      this.localService.getJsonValue('thereAreTestimonial')
    );
  }

  /** Obtiene datos del contenido de la pagina */
  get currentContentvalue(): ContentPage[] {
    return this.currentContentSubject.value;
  }

  async getContentPageWeb() {
    this.spinner.show();
    try {
      await this.httpClient.get<ResponseApiContent>(`${this.urlLaravel}/getPageContent`).subscribe((resp: ResponseApiContent) => {
        this.spinner.hide();
        if (resp.status === 1) {
          this.spinner.hide();
          this.saveContent(resp.data);
          this.currentContentSubject.next(resp.data);
        } else {
          this.messageService.toastError(resp.msn);
        }
      });
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error contenido en ContentWebService', error);
    }
  }

  /**
   * Obtiene datos de las categorias de servicepluss
   */
  get currentCategoryvalue(): CategoryPage[] {
    return this.currentCategorySubject.value;
  }

  async getCategories() {
    try {
      await this.httpClient.get<ResponseApiContent>(`${this.urlLaravel}/getCategorias`).subscribe((resp: ResponseApiContent) => {
        if (resp.status === 1) {
          this.saveAllCategory(resp.data);
          this.currentCategorySubject.next(resp.data);
        } else {
          this.messageService.toastError(resp.msn);
        }
      });
    } catch (error) {
      this.handlerError(error);
      console.error('Error categorias en ContentWebService', error);
    }
  }

  /** Obtiene datos de las primeras 5 categorías */
  get currentFiveCategoriesValue(): CategoryPage[] {
    return this.currentFiveCategorySubject.value;
  }

  async getFiveCategories() {
    this.spinner.show();
    try {
      await this.httpClient.get<ResponseApiContent>(`${this.urlLaravel}/getCategoriasGL`).subscribe((resp: ResponseApiContent) => {
        this.spinner.hide();
        if (resp.status === 1) {
          this.spinner.hide();
          this.saveFiveCategory(resp.data);
          this.currentFiveCategorySubject.next(resp.data);
        } else {
          this.messageService.toastError(resp.msn);
        }
      });
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error cinco primeras categorias en ContentWebService', error);
    }
  }

  getSubCategories(json) {
    this.spinner.show();
    try {
      return this.httpClient.post<ResponseApiContent>(`${this.urlLaravel}/getSubCategorias`, json);
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error subcategorias en ContentWebService', error);
    }
  }

  getDepartament() {
    this.spinner.show();
    try {
      return this.httpClient.get<ResponseApiContent>(`${this.urlLaravel}/getDepartamento`, { headers: this.headers });
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error departamentos en ContentWebService', error);
    }
  }

  getCotizacion(json) {
    this.spinner.show();
    try {
      return this.httpClient.post<ResponseApiContent>(`${this.urlLaravel}/getQuotationByService`, json,
      { headers: this.headers });
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error cotizaciones en ContentWebService', error);
    }
  }

  getImageService(json) {
    this.spinner.show();
    try {
      return this.httpClient.post<ResponseApiContent>(`${this.urlLaravel}/getAttachmentService`, json,
      { headers: this.headers });
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error cotizaciones en ContentWebService', error);
    }
  }

  getCities(json) {
    this.spinner.show();
    try {
      return this.httpClient.post<ResponseApiContent>(`${this.urlLaravel}/getCiudad`, json, { headers: this.headers });
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error ciudades en ContentWebService', error);
    }
  }

  getParameterUser(json) {
    this.spinner.show();
    try {
      return this.httpClient.post<ResponseApiContent>(`${this.urlLaravel}/getParametros`, json, { headers: this.headers });
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error departamentos en ContentWebService', error);
    }
  }

  /** Obtiene datos de las preguntas frecuentes */
  get currentFaqValue(): FaqPage[] {
    return this.currentFaqSubject.value;
  }

  async getFaq() {
    try {
      await this.httpClient.get<ResponseApiContent>(`${this.urlLaravel}/getFaqs`).subscribe((resp: ResponseApiContent) => {
        if (resp.status === 1) {
          this.saveFaq(resp.data);
          this.currentFaqSubject.next(resp.data);
        } else {
          this.messageService.toastError(resp.msn);
        }
      });
    } catch (error) {
      this.handlerError(error);
      console.error('Error preguntas frecuentes en ContentWebService', error);
    }
  }

  /** Obtiene datos los reviews de la pagina */
  get currentReviewValue(): ReviewsPage[] {
    return this.currentReviewSubject.value;
  }

  async getReviewsInPage() {
    try {
      await this.httpClient.get<ResponseApiContent>(`${this.urlLaravel}/getTestimonial`).subscribe((resp: ResponseApiContent) => {
        if (resp.status === 1) {
          this.saveReview(resp.data);
          this.currentReviewSubject.next(resp.data);
        } else {
          this.messageService.toastError(resp.msn);
        }
      });
    } catch (error) {
      this.handlerError(error);
      console.error('Error reviews en ContentWebService', error);
    }
  }

  get currentProfessionalValue(): ResponseApiContent {
    return this.currentProfessionalSubject.value;
  }

  //Actualizar perfil
  updatePerfil(json) {
    try {
      return this.httpClient.post<ResponseApiContent>(`${this.urlLaravel}/EditInfoUser`, json);
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error getListDetailProfessional en ContentWebService', error);
    }
  }




  async getListProfessional(page = 1) {
    this.spinner.show();
    try {
      await this.httpClient.get<ResponseApiContent>(`${this.urlLaravel}/getDataProfessional?page=${page}`)
        .subscribe((resp: ResponseApiContent) => {
          if (resp.status === 1) {
            this.spinner.hide();
            this.saveListProfessional(resp);
            this.currentProfessionalSubject.next(resp);
          } else {
            this.spinner.hide();
            this.messageService.toastError(resp.msn);
          }
        });
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error getListProfessional en ContentWebService', error);
    }
  }

  getListDetailProfessional(json) {
    try {
      return this.httpClient.post<ResponseApiContent>(`${this.urlLaravel}/getDataProfessionalParams`, json);
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error getListDetailProfessional en ContentWebService', error);
    }
  }

  getListService(page) {
    try {
      return this.httpClient.get<ResponseApiContent>(`${this.urlLaravel}/getServiciosUsuario?page=${page}`, { headers: this.headers });
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error getListService en ContentWebService', error);
    }
  }

  getCountService() {
    try {
      return this.httpClient.get<ResponseApiContent>(`${this.urlLaravel}/statusCounter`, { headers: this.headers });
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error getcountService en ContentWebService', error);
    }
  }
  /** Aprobar o rechazar cotizaciones */
  setChangeStatusCotizacion(request){
    try {
      return this.httpClient.post<ResponseApiContent>(`${this.urlLaravel}/setQuotationStatus`,request, { headers: this.headers });
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error getcountService en ContentWebService', error);
    }
  }
  /**
   * Cancelar servicio 
   */
  setChangeStatusServicio(request){
    try {
      return this.httpClient.post<ResponseApiContent>(`${this.urlLaravel}/setServicesStatus`,request, { headers: this.headers });
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error getcountService en ContentWebService', error);
    }
  }

  /** Obtiene analitica para mostrar en el home */
  get currentAnaliticvalue(): Analitic[] {
    return this.currentAnaliticSubject.value;
  }

  async getAnalitic() {
    this.spinner.show();
    try {
      await this.httpClient.get<ResponseApiContent>(`${this.urlLaravel}/getAnalitica`).subscribe((resp: ResponseApiContent) => {
        this.spinner.hide();
        if (resp.status === 1) {
          this.spinner.hide();
          this.saveAnalitic(resp.data);
          this.currentAnaliticSubject.next(resp.data);
        } else {
          this.messageService.toastError(resp.msn);
        }
      });
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error getAnalitic en ContentWebService', error);
    }
  }


  /** Obtiene data para saber si ya hizo un testimonio */
  get currentThereAreTestimonial(): ThereAreTestimonial {
    return this.currentThereAreTestimonialSubject.value;
  }

  async getTestimonialThereAre() {
    this.spinner.show();
    try {
      await this.httpClient.get<ThereAreTestimonial>(`${this.urlLaravel}/countTestimonial`, { headers: this.headers })
      .subscribe((resp: ThereAreTestimonial) => {
        this.spinner.hide();
        if (resp.status === 1) {
          this.spinner.hide();
          this.saveThereAreaTestimonial(resp);
          this.currentThereAreTestimonialSubject.next(resp);
        } else {
          this.messageService.toastError(resp.msn);
        }
      });
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error getTestimonialThereAre en content-service', error);
    }
  }

  saveContent(contentPage: ContentPage[]): void {
    this.localService.setJsonValue('content', contentPage);
  }

  saveAllCategory(contentCategory: CategoryPage[]): void {
    this.localService.setJsonValue('category', contentCategory);
  }

  saveFiveCategory(contentFiveCategory: CategoryPage[]): void {
    this.localService.setJsonValue('categoryFirst', contentFiveCategory);
  }

  saveFaq(contentFaq: FaqPage[]): void {
    this.localService.setJsonValue('Faq', contentFaq);
  }

  saveReview(contentReview: ReviewsPage[]): void {
    this.localService.setJsonValue('reviews', contentReview);
  }

  saveListProfessional(contentProfessional: ResponseApiContent): void {
    this.localService.setJsonValue('professional', contentProfessional);
  }

  saveAnalitic(contentAnalitic: Analitic[]): void {
    this.localService.setJsonValue('analitic', contentAnalitic);
  }

  saveThereAreaTestimonial(thereAreTestimonial: ThereAreTestimonial): void {
    this.localService.setJsonValue('thereAreTestimonial', thereAreTestimonial);
  }

  handlerError(err): Observable<never> {
    let errorMessage = 'Se produjo un error en el servidor';
    if (err) {
      errorMessage = `${err}`;
    }
    this.messageService.alertDanger(errorMessage);
    return throwError(errorMessage);
  }
}
