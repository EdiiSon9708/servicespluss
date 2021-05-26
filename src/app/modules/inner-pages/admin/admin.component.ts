import { Component, OnInit } from '@angular/core';

import { ModalReviewsComponent } from '@components/modals/modal-reviews/modal-reviews.component';

import { AuthService } from '@core/services/auth/auth.service';
import { ContentWebService } from '@core/services/content-web/content-web.service';

import { User } from '@shared/models/user';

import { MatDialog } from '@angular/material/dialog';
import { LocalServiceService } from '@core/services/localService/local-service.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../core/services/message/message.service';

import { ContentPage } from '@shared/models/content-page';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  /** Varibale globales y datos traidos de otros componente o servicios */
  contentPage: ContentPage[];

  tittle = 'Bienvenido a servicepluss';
  user: User;

  constructor(private authService: AuthService, public dialog: MatDialog, private contentWebService: ContentWebService,private localService: LocalServiceService,private router: Router,private messageService: MessageService) {
    this.user = this.authService.currentUservalue;
    this.contentPage = this.contentWebService.currentContentvalue;

    console.log(this.user);
    
    this.contentWebService.getTestimonialThereAre();
  }

  ngOnInit(): void {
    if (this.contentWebService.currentThereAreTestimonial.data === 0) {
      // this.openCalification();
    }
     
    if(this.localService.getJsonValue('crear_servicio')==1){
      this.localService.removeItem('crear_servicio');
      this.router.navigate(['/quotation']);
    }

  }
  
  completardatos(){
    this.messageService.alertSuccess('Por favor Completar su información');
  }

  // openCalification() {
  //   const dialogCalification = this.dialog.open(ModalReviewsComponent, { width: '800px'});
  //   dialogCalification.afterClosed().subscribe(result => result);
  // }

}
