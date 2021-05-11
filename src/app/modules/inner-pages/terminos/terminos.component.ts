import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.scss']
})
export class TerminosComponent implements OnInit {
  
  
  viewOption = false;
  viewSelectLogin;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.viewSelectLogin=3;
  }

  viewSelectOption(state:boolean, viewSelect:number){
    this.viewOption = state;
    this.viewSelectLogin = viewSelect;
  }
}
