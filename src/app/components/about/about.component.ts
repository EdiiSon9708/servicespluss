import { Component, OnInit } from '@angular/core';

import { ContentPage } from '@shared/models/content-page';

import { ContentWebService } from '@core/services/content-web/content-web.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  /** Variables globales */
  about: ContentPage[];

  constructor(private contentWebService: ContentWebService) {
    this.about = this.contentWebService.currentContentvalue;
  }

  ngOnInit(): void {
  }

}
