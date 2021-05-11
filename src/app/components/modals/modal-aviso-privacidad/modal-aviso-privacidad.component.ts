import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogCheckbox } from '@core/footer/footer.component';

@Component({
  selector: 'app-modal-aviso-privacidad',
  templateUrl: './modal-aviso-privacidad.component.html',
  styleUrls: ['./modal-aviso-privacidad.component.scss']
})
export class ModalAvisoPrivacidadComponent implements OnInit {

  /** Variables globales */
  isVisible: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogCheckbox: DialogCheckbox) { }

  ngOnInit(): void {
    this.isVisible = this.dialogCheckbox.checkboxEmails;
  }
  
  // abrirLink() {
  //   window.open('https://servicespluss.com/docs/AutorizacionDatosPersonales.pdf?pg=456445654', '_blank');
  // }
}
