import { Component, OnInit } from '@angular/core';

import { ModalTerminosComponent } from '@components/modals/modal-terminos/modal-terminos.component';

import { ContentPage } from '@shared/models/content-page';

import { ContentWebService } from '@core/services/content-web/content-web.service';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalAutorizaDatosComponent } from '@src/app/components/modals/modal-autoriza-datos/modal-autoriza-datos.component';
import { ModalAvisoPrivacidadComponent } from '@src/app/components/modals/modal-aviso-privacidad/modal-aviso-privacidad.component';
import { ModalPoliticaDatosComponent } from '@src/app/components/modals/modal-politica-datos/modal-politica-datos.component';

export interface DialogCheckbox {
  checkboxEmails: boolean;
}

@Component({
  selector: 'app-footer-one',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  /** Variables globales */
  footer: ContentPage[];
  contacts = this.infoContact();

  constructor(public dialog: MatDialog, private contentWebService: ContentWebService) {
    this.footer = this.contentWebService.currentContentvalue;
  }

  ngOnInit(): void {
  }

  infoContact() {
    return [
      {
        icon: 'fa-home',
        info: 'Bogotá, Colombia'
      },
      {
        icon: 'fa-phone-alt',
        info: '(+57) 310 1234567'
      },
      {
        icon: 'fa-envelope',
        info: 'servicioalcliente@servicepluss.com'
      }
    ];
  }

  openDialog(modal: number) {
    let dialogRef: MatDialogRef<ModalTerminosComponent, any>
    switch (modal) {
      case 1:
        dialogRef = this.dialog.open(ModalTerminosComponent, {
          width: '1000px', data: {
            checkboxEmails: true
          }
        });
        break;
      case 2:
        dialogRef = this.dialog.open(ModalAutorizaDatosComponent, {
          width: '1000px', data: {
            checkboxEmails: true
          }
        });
        break;
      case 3:
        dialogRef = this.dialog.open(ModalPoliticaDatosComponent, {
          width: '1000px', data: {
            checkboxEmails: true
          }
        });      
        break;
      case 4:
        dialogRef = this.dialog.open(ModalAvisoPrivacidadComponent, {
          width: '1000px', data: {
            checkboxEmails: true
          }
        });        
        break;

      default:
        break;
    }
    
    dialogRef.afterClosed().subscribe(result => result);
  }

}
