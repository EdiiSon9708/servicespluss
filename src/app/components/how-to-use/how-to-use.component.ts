import { Component, OnInit } from '@angular/core';

import { ContentWebService } from '@core/services/content-web/content-web.service';

import { ContentPage } from '@shared/models/content-page';

@Component({
  selector: 'app-how-to-use',
  templateUrl: './how-to-use.component.html',
  styleUrls: ['./how-to-use.component.scss']
})
export class HowToUseComponent implements OnInit {

  /** Variables globales */
  dataContent: ContentPage[];

  constructor(private contentWebService: ContentWebService) {
    this.dataContent = this.contentWebService.currentContentvalue;
  }

  ngOnInit(): void {
  }

}
