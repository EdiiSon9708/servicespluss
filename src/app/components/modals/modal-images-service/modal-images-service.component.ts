import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-images-service',
  templateUrl: './modal-images-service.component.html',
  styleUrls: ['./modal-images-service.component.scss']
})
export class ModalImagesServiceComponent implements OnInit {
  fotosService=[];
  idServicio=0;
  constructor(@Inject(MAT_DIALOG_DATA) public fotosServ: any) { }

  ngOnInit(): void {
    this.fotosService = this.fotosServ;
    this.idServicio = this.fotosService[0]['idServicioFoto'];
    console.log(this.fotosService);
  }

}
