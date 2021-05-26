import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, Scroll } from '@angular/router';
// import { SwUpdate } from '@angular/service-worker';
import { filter } from 'rxjs/operators';

import { ContentWebService } from '@core/services/content-web/content-web.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(router: Router, viewportScroller: ViewportScroller, private contentWebService: ContentWebService,
             ) {
    router.events.pipe(filter((e): e is Scroll => e instanceof Scroll))
      .subscribe(e => {
        if (e.position) {
          // backward navigation
          setTimeout(() => { viewportScroller.scrollToPosition(e.position); }, 0);
        } else if (e.anchor) {
          // anchor navigation
          setTimeout(() => { viewportScroller.scrollToAnchor(e.anchor); }, 0);
        } else {
          // forward navigation
          setTimeout(() => { viewportScroller.scrollToPosition([0, 0]); }, 0);
        }
      });
    this.contentWebService.getContentPageWeb();
    this.contentWebService.getCategories();
    this.contentWebService.getFiveCategories();
    this.contentWebService.getFaq();
    this.contentWebService.getReviewsInPage();
    this.contentWebService.getListProfessional();
    this.contentWebService.getAnalitic();
  }

  ngOnInit() {
    // if (this.swUpdate.isEnabled) {
    //   this.swUpdate.available.subscribe(() => {
    //     if (confirm('Nueva versioón disponible. Cargar nueva versión?')) {
    //       window.location.reload();
    //     }
    //   });
    // }
  }

}
