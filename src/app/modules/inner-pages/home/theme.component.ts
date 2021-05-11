import { Component, OnInit } from '@angular/core';

import { ContentWebService } from '@core/services/content-web/content-web.service';

import { CategoryPage, ContentPage } from '@shared/models/content-page';

@Component({
  selector: 'app-theme-two',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  /** Variables globales */
  home: ContentPage[];
  categoryHome: CategoryPage[];
  fiveCategoryHome: CategoryPage[];

  constructor(private contentWebService: ContentWebService) {
    this.home = this.contentWebService.currentContentvalue;
    this.categoryHome = this.contentWebService.currentCategoryvalue;
    this.fiveCategoryHome = this.contentWebService.currentFiveCategoriesValue;
  }

  ngOnInit(): void {
  }

}
