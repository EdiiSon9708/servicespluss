import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  data: any;
}

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent implements OnInit {

  /** Variables globales */
  resp = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.resp.push(data.data);
  }

  ngOnInit(): void {
  }

}
