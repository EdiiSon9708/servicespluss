import { Component, OnInit } from '@angular/core';

import { ContentWebService } from '@core/services/content-web/content-web.service';

import { ReviewsPage } from '@shared/models/content-page';

import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-reviews-one',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  /** Variables globales */
  tittle = '¿Que dicen nuestros serviclientes?';
  myInterval = 3000;
  activeSlideIndex = 0;
  reviewsPage: ReviewsPage[] = [];
  MAX_NUMBER_OF_STARS = 5;
  rating = 0;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['Anterior', 'Siguiente'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }









  private get numberOfFullStars(): number {
    return Math.floor(this.rating);
  }

  private get numberOfEmptyStars(): number {
    return this.MAX_NUMBER_OF_STARS - Math.ceil(this.rating);
  }

  get fullStars(): any[] {
    return Array(this.numberOfFullStars);
  }

  get emptyStars(): any[] {
    return Array(this.numberOfEmptyStars);
  }

  constructor(private contentWebService: ContentWebService) {
    this.reviewsPage = this.contentWebService.currentReviewValue;
    this.getReviews();
  }

  ngOnInit(): void {
    this.myInterval = 3000;
    this.activeSlideIndex = 0;
  }

  async getReviews() {
    await this.contentWebService.currentReviewValue.forEach(element => {
      this.rating = element.reviews;
      element.fullStars = this.fullStars;
      element.emptyStars = this.emptyStars;
      return this.reviewsPage.push(element);
    });
  }

}
