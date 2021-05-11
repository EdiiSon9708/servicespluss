import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Quotation, QuotationInformation } from '@shared/models/content-page';
import { ContentWebService } from '@core/services/content-web/content-web.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from '@core/services/message/message.service';

@Component({
  selector: 'app-modal-service',
  templateUrl: './modal-service.component.html',
  styleUrls: ['./modal-service.component.scss']
})
export class ModalServiceComponent implements OnInit {
  /** Variables globales */
  panelOpenState = false;
  cotizaciones: QuotationInformation[] = [];
  idService: Quotation;
  estadoServicio = 0;

  constructor(public dialogRef: MatDialogRef<ModalServiceComponent>,@Inject(MAT_DIALOG_DATA) public data,
    private contentWebService: ContentWebService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.estadoServicio = this.data[0].idEstadoServicio;
    this.cotizaciones = this.data[0].quotation_services;
    this.idService = this.data[0];
    // console.log(this.cotizaciones);
  }
  aceptatCotizacion(status: number, servicio: number, cotizacion: number) {
    console.log(status, servicio, cotizacion);
    this.spinner.show();
    let req = { idCotization: cotizacion, idServicio: servicio, status: status }
    this.contentWebService.setChangeStatusCotizacion(req).subscribe((res) => {
      this.spinner.hide();
      if (res.status === 1) {
        this.spinner.hide();
        this.messageService.alertSuccess(res.msn);
        this.dialogRef.close();
      } else {
        this.spinner.hide();
        console.warn('countService in my-service', res.data);
        this.messageService.toastError(res.msn);
      }
      console.log(res);
    })
  }
  switchStatus(status) {
    switch (status) {
      case 1:
        return 'Pendiente';
        break;
      case 2:
        return 'Activo';
        break;
      case 3:
        return 'En curso';
        break;
      case 4:
        return 'Finalizado';
        break;
    }
  }

}
