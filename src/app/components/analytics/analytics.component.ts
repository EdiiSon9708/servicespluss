import { Component, OnInit } from '@angular/core';

import { ContentWebService } from '@core/services/content-web/content-web.service';


@Component({
  selector: 'app-cta-two',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  /** Variables globales */
  analitics: any;
  dataAnalitic: any;

  constructor(private contentWebService: ContentWebService) {
    this.dataAnalitic = this.contentWebService.currentAnaliticvalue;
  }

  ngOnInit(): void {
    this.analitics = this.getAnalitics();
  }

  getAnalitics() {
    return [
      {
        icon: 'fa-download',
        text: 'Descargas de app',
        data: `+${this.dataAnalitic.descargas}`
      },
      {
        icon: 'fa-paper-plane',
        text: 'Solicitudes enviadas',
        data: `+${this.dataAnalitic.enviadas}`
      },
      {
        icon: 'fa-comments',
        text: 'Solicitudes contestadas',
        data: `+${this.dataAnalitic.contestadas}`
      }
    ];
  }

}
