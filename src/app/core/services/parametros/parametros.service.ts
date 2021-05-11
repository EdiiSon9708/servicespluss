import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApiContent } from '@shared/models/responseApi';
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  constructor(private httpClient: HttpClient) { }
  urlLaravel = `${environment.configDB.apiLaravel}/page`;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  departament():Observable<ResponseApiContent> {
    
    try {
      return this.httpClient.get<ResponseApiContent>(`${this.urlLaravel}/getDepartamento`, { headers: this.headers });
    } catch (error) {
      console.error('Error crear commentarios en form-page-service', error);
    }
  }
  city(request):Observable<ResponseApiContent> {
    
    try {
      return this.httpClient.post<ResponseApiContent>(`${this.urlLaravel}/getCiudad`, request, { headers: this.headers });
    } catch (error) {
      console.error('Error crear commentarios en form-page-service', error);
    }
  }
  zone(request):Observable<ResponseApiContent> {
    
    try {
      return this.httpClient.post<ResponseApiContent>(`${this.urlLaravel}/getZonas`, request, { headers: this.headers });
    } catch (error) {
      console.error('Error crear commentarios en form-page-service', error);
    }
  }
}
