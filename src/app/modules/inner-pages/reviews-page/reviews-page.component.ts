import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews-page',
  templateUrl: './reviews-page.component.html',
  styleUrls: ['./reviews-page.component.scss']
})
export class ReviewsPageComponent implements OnInit {
  tittle = '¿Por qué utilizar servicepluss?';
  breadcrumbTittle = 'Testimonios';

  constructor() { }
  ngOnInit(): void {
  }

}
