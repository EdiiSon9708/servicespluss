import { Component, OnInit, Input } from '@angular/core';

import { ContentPage } from '@shared/models/content-page.js';


@Component({
  selector: 'app-features-two',
  templateUrl: './our-categories.component.html',
  styleUrls: ['./our-categories.component.scss']
})
export class OurCategoriesComponent implements OnInit {

  /** Variables globales */
  @Input() dataContent: ContentPage[];

  constructor() { }

  ngOnInit(): void {
  }

}
