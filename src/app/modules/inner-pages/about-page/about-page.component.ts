import { Component, OnInit } from '@angular/core';

import { ContentWebService } from '@core/services/content-web/content-web.service';

import { ContentPage } from '@shared/models/content-page';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

// variables globales

  download: ContentPage[];

  tittle = '¿Quieres saber más?';
  breadcrumbTittle = 'Acerca de nosotros';

  constructor(private contentWebService: ContentWebService) { 
    this.download = this.contentWebService.currentContentvalue;
  }

  ngOnInit(): void {
  }

}
