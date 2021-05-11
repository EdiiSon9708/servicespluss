import { Component, OnInit } from '@angular/core';

import { FaqPage } from '@shared/models/content-page';

import { ContentWebService } from '@core/services/content-web/content-web.service';

@Component({
  selector: 'app-faq-one',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  /** Variables globales */
  panelOpenState = false;
  faqPageClient: FaqPage[];

  constructor(private contentWebService: ContentWebService) {
    this.faqPageClient = this.contentWebService.currentFaqValue;
  }

  ngOnInit(): void {
  }

}
