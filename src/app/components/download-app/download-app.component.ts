import { Component, Input, OnInit } from '@angular/core';

import { ContentPage } from '@shared/models/content-page';

@Component({
  selector: 'app-download',
  templateUrl: './download-app.component.html',
  styleUrls: ['./download-app.component.scss']
})
export class DownloadAppComponent implements OnInit {

  @Input() dataContent: ContentPage[];

  constructor() { }

  ngOnInit(): void {
  }

}
