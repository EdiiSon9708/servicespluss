import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';

import { environment } from '@src/environments/environment';

import { MessageService } from '@core/services/message/message.service';

import { ResponseApiContent } from '@shared/models/responseApi';

import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class FormsPageService {

  /** Variables globales */
  urlLaravel = `${environment.configDB.apiLaravel}/page`;

  constructor(private httpClient: HttpClient, private spinner: NgxSpinnerService, private messageService: MessageService) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  createComment(json) {
    try {
      return this.httpClient.post<ResponseApiContent>(`${this.urlLaravel}/saveComentarios`, json, { headers: this.headers });
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error crear commentarios en form-page-service', error);
    }
  }

  createQuestion(json) {
    try {
      return this.httpClient.post<ResponseApiContent>(`${this.urlLaravel}/saveFaqs`, json);
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error crear pregunta en form-page-service', error);
    }
  }

  createReview(json) {
    try {
      return this.httpClient.post<ResponseApiContent>(`${this.urlLaravel}/saveTestimonial`, json, { headers: this.headers });
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error crear pregunta en form-page-service', error);
    }
  }

  createService(json) {
    try {
      return this.httpClient.post<ResponseApiContent>(`${this.urlLaravel}/saveServicios`, json, { headers: this.headers });
    } catch (error) {
      this.spinner.hide();
      this.handlerError(error);
      console.error('Error crear servicios en formPageService', error);
    }
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
