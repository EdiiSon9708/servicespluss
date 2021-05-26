import { Component, OnInit } from '@angular/core';

import { ContentWebService } from '@core/services/content-web/content-web.service';

import { ContentPage } from '@shared/models/content-page';


@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss']
})
export class FaqPageComponent implements OnInit {

  download: ContentPage[];
  tittle = '¡Estamos aquí para ayudar!';
  breadcrumbTittle = 'Preguntas frecuentes';

  constructor(private contentWebService: ContentWebService) {
    this.download = this.contentWebService.currentContentvalue;
   }

  ngOnInit(): void {
  }

}
