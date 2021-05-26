import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ContentPage } from '@shared/models/content-page';

import { ModalServiceComponent } from '@components/modals/modal-service/modal-service.component';

import { AuthService } from '@core/services/auth/auth.service';
import { ContentWebService } from '@core/services/content-web/content-web.service';
import { MessageService } from '@core/services/message/message.service';

import { User } from '@shared/models/user';
import { ResponseApiContent } from '@shared/models/responseApi';

import { NgxSpinnerService } from 'ngx-spinner';
import { Service } from '@src/app/shared/models/content-page';
import { StateService } from '@src/app/shared/models/admin';
import { LocalServiceService } from '../../core/services/localService/local-service.service';
import { FormsPageService } from '@core/services/forms-page/forms-page.service';
import { ModalImagesServiceComponent } from '../modals/modal-images-service/modal-images-service.component';


@Component({
  selector: 'app-myservice',
  templateUrl: './my-service.component.html',
  styleUrls: ['./my-service.component.scss']
})
export class MyServiceComponent implements OnInit {

  @Input() dataContent: ContentPage[];

  /** Variable globales */
  fieldSearch = '';
  user: User;
  dataServices: Service[];
  pagination: ResponseApiContent = new ResponseApiContent();
  page = 1;
  countServices: StateService[];
  itemsPerSlide = 4;
  itemsPerSlideSmall = 2;
  itemsForPage = [];

  /** titulos de tabla */
  jsontitles = [
    {
      name: 'Radicado'
    },
    {
      name: 'Categoría'
    },
    {
      name: 'Sub Categoría'
    },
    {
      name: 'Fecha solicitud'
    },
    {
      name: 'Estado'
    },
    {
      name: 'Dirección'
    },
    {
      name: 'Profesional'
    },
  ];


  constructor(public dialog: MatDialog, private contentWebService: ContentWebService, private authService: AuthService,
              private spinner: NgxSpinnerService, private messageService: MessageService,private localService: LocalServiceService,private formsPageService: FormsPageService) {
    this.user = this.authService.currentUservalue;
  }

  ngOnInit(): void {
    if (this.user) {
      console.log(this.localService.getJsonValue('create_service'));
      this.saveServiceLogin();
      setTimeout(() =>{
        this.listService(this.page);
      },1500)
      this.countService();
    }
  }
 async saveServiceLogin(){
    if(this.localService.getJsonValue('create_service')){
      this.spinner.show();
      
      let dataService = this.localService.getJsonValue('create_service');
      this.localService.removeItem('create_service');
      await this.formsPageService.createService(dataService).subscribe(resp => {
        if (resp.status === 1) {
          this.spinner.hide();
          // this.horizontalStepperStep3.get('address').reset();
          this.messageService.alertSuccess(resp.msn);
          // this.router.navigate(['admin']);
        } else {
          this.spinner.hide();
          console.warn(resp.data);
          this.messageService.toastError(resp.msn);
        }
      });
    }
  }
  listService(page) {
    this.spinner.show();
    try {
      this.contentWebService.getListService(page).subscribe((resp) => {
        this.itemsForPage = [];
        if (resp.status === 1) {
          this.spinner.hide();
          this.dataServices = resp.data;
         
          this.pagination = resp;
          this.itemsForPage = new Array(resp.meta.last_page);
        } else {
          this.spinner.hide();
          console.warn('listService in my-service', resp.data);
          this.messageService.toastError(resp.msn);
        }
      });
    } catch (error) {
      this.spinner.hide();
      this.contentWebService.handlerError(error);
      console.error('Error listService en componente admin cliente', error);
    }
  }

  countService() {
    this.spinner.show();
    try {
      this.contentWebService.getCountService().subscribe((resp) => {
        if (resp.status === 1) {
          this.spinner.hide();
          this.countServices = resp.data;
        } else {
          this.spinner.hide();
          console.warn('countService in my-service', resp.data);
          this.messageService.toastError(resp.msn);
        }
      });
    } catch (error) {
      this.spinner.hide();
      this.contentWebService.handlerError(error);
      console.error('Error listService en componente admin cliente', error);
    }
  }

  onClickPagination(page) {
    if(page>0){
      this.listService(page);
    }
  }

  openCotizations(id) {
    this.spinner.show();
    const json = { idService: id.id_srv };
    try {
      this.contentWebService.getCotizacion(json).subscribe((resp) => {
        this.spinner.hide();
        if (resp.status === 1) {
          const dialogCotization = this.dialog.open(ModalServiceComponent, {
            width: '800px',
            data: resp.data
          });
          dialogCotization.afterClosed().subscribe(result => result);
        } else {
          console.warn('openCotizations in my-service', resp.data);
          this.messageService.toastError(resp.msn);
        }
      });
    } catch (error) {
      this.spinner.hide();
      this.contentWebService.handlerError(error);
      console.error('Error openCotizations en componente my-service', error);
    }
  }
  openImagesService(id){
    this.spinner.show();
    const json = { idservicio: id.id_srv };
    try {
      this.contentWebService.getImageService(json).subscribe((resp) => {
        this.spinner.hide();
        if (resp.status === 1) {
          const dialogCotization = this.dialog.open(ModalImagesServiceComponent, {
            width: '800px',
            data: resp.data
          });
          dialogCotization.afterClosed().subscribe(result => result);
        } else {
          console.warn('openCotizations in my-service', resp.data);
          this.messageService.toastError(resp.msn);
        }
      });
    } catch (error) {
      this.spinner.hide();
      this.contentWebService.handlerError(error);
      console.error('Error openCotizations en componente my-service', error);
    }
  }
  
  removeCotizations(servicio){
    // this.spinner.show();
    this.contentWebService.setChangeStatusServicio({idServicio:servicio.id_srv,status:5}).subscribe((res)=>{
      this.spinner.hide();
      if (res.status === 1) {
        // this.spinner.hide();
        
        this.listService(this.page);
        this.messageService.alertSuccess(res.msn);
        this.countService();
      } else {
        // this.spinner.hide();
        console.warn('countService in my-service', res.data);
        this.messageService.toastError(res.msn);
      }
    })

    
     console.log(servicio); 
  }

}
