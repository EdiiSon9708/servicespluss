import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogCheckbox } from '@core/footer/footer.component';

@Component({
  selector: 'app-modal-terminos',
  templateUrl: './modal-terminos.component.html',
  styleUrls: ['./modal-terminos.component.scss']
})
export class ModalTerminosComponent implements OnInit {

  /** Variables globales */
  isVisible: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogCheckbox: DialogCheckbox) { }

  ngOnInit(): void {
    this.isVisible = this.dialogCheckbox.checkboxEmails;
  }

}
