import { Component, Input, OnInit } from '@angular/core';

import { ContentPage } from '@shared/models/content-page';

@Component({
  selector: 'app-discover-two',
  templateUrl: './how-to-use-home.component.html',
  styleUrls: ['./how-to-use-home.component.scss']
})
export class HowToUseHomeComponent implements OnInit {

  /** Variables globales */
  @Input() dataContent: ContentPage[];

  constructor() { }

  ngOnInit(): void {
  }

}
