import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoryPage } from '@shared/models/content-page';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {

  fieldSearchCategory = '';
  arrayCategories: CategoryPage[];

  constructor(@Inject(MAT_DIALOG_DATA) public dataCategories: any, private router: Router) {}

  ngOnInit(): void {
    this.arrayCategories = this.dataCategories.listCategories;
  }

  onClickCotizar(id){
    this.router.navigate(['/quotation'], { queryParams: {idCategory: id}});
  }


}
