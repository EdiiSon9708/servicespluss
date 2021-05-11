import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogCheckbox } from '@core/footer/footer.component';

@Component({
  selector: 'app-modal-autoriza-datos',
  templateUrl: './modal-autoriza-datos.component.html',
  styleUrls: ['./modal-autoriza-datos.component.scss']
})
export class ModalAutorizaDatosComponent implements OnInit {

   /** Variables globales */
   isVisible: boolean;

   constructor(@Inject(MAT_DIALOG_DATA) public dialogCheckbox: DialogCheckbox) { }
 
   ngOnInit(): void {
     this.isVisible = this.dialogCheckbox.checkboxEmails;
   }

   abrirLink() {
    window.open('https://servicespluss.com/docs/AutorizacionDatosPersonales.pdf?pg=456445654', '_blank');
  }

}
