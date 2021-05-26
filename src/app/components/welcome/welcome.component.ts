import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ModalsComponent } from '@components/modals/modal-list-category/modals.component';

import { CategoryPage, ContentPage } from '@shared/models/content-page';

import { User } from '@shared/models/user';
import { MessageService } from '@core/services/message/message.service';
import { AuthService } from '@core/services/auth/auth.service';


import { NgwWowService } from 'ngx-wow';
import { MatDialog } from '@angular/material/dialog';
import * as M from '@src/assets/js/materialize.min.js';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, AfterViewInit {


  /** Variables globales */
  dataUser: User;
  options = { indicators: true, padding: 10, duration: 0, numVisible: 7, shift: 1 };
  @Input() dataContent: ContentPage[];
  @Input() dataCategories: CategoryPage[];
  @Input() dataFiveCategories: CategoryPage[];

  constructor(private wowService: NgwWowService, public dialog: MatDialog, private router: Router, private messageService: MessageService, private authService: AuthService) {
    this.dataUser = this.authService.currentUservalue;
   }

  ngOnInit(): void {
    this.wowService.init();
  }

  ngAfterViewInit() {
    const elems = document.querySelectorAll('.carousel');
    const instances = M.Carousel.init(elems, this.options);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalsComponent, {
      width: '900px', data: {
        listCategories: this.dataCategories
      }
    });
    dialogRef
    
    .afterClosed().subscribe(result => result);
  }

  onClickCotizar(id){
    if (this.dataUser) {
      this.router.navigate(['/quotation'], { queryParams: {idCategory: id}});
    }
    else {
      const msn = 'Clic en continuar, y regístrate';
      this.messageService.alertCotizaciónSesion(msn);
     }
  }

}
