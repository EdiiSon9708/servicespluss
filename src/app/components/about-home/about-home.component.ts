import { Component, Input, OnInit } from '@angular/core';

import { ContentPage } from '@shared/models/content-page';

@Component({
  selector: 'app-service-two',
  templateUrl: './about-home.component.html',
  styleUrls: ['./about-home.component.scss']
})
export class AboutHomeComponent implements OnInit {

  /** Variables globales */
  @Input() dataContent: ContentPage[];

  constructor() { }

  ngOnInit(): void {
  }

}
