import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoryPage } from '@shared/models/content-page';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { User } from '@shared/models/user';
import { MessageService } from '@core/services/message/message.service';
import { AuthService } from '@core/services/auth/auth.service';


@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {

  dataUser:User;

  fieldSearchCategory = '';
  arrayCategories: CategoryPage[];

  constructor(@Inject(MAT_DIALOG_DATA) public dataCategories: any, private router: Router, private messageService: MessageService, private authService: AuthService) {
    this.dataUser = this.authService.currentUservalue;
  }

  ngOnInit(): void {
    this.arrayCategories = this.dataCategories.listCategories;
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
