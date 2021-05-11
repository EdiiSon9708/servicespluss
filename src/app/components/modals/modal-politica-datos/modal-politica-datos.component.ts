import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogCheckbox } from '../../../core/footer/footer.component';

@Component({
  selector: 'app-modal-politica-datos',
  templateUrl: './modal-politica-datos.component.html',
  styleUrls: ['./modal-politica-datos.component.scss']
})
export class ModalPoliticaDatosComponent implements OnInit {

  
  /** Variables globales */
  isVisible: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogCheckbox: DialogCheckbox) { }

  ngOnInit(): void {
    this.isVisible = this.dialogCheckbox.checkboxEmails;
  }

}
