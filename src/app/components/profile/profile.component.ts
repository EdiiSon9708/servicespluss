import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ContentWebService } from '@core/services/content-web/content-web.service';
import { MessageService } from '@core/services/message/message.service';

import { CityAdmin, DepartamentAdmin, Parameter } from '@shared/models/content-page';
import { ResponseApiContent } from '@shared/models/responseApi';
import { User } from '@shared/models/user';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

//   jsondates = [
//   {
//     id: '1',
//     mes: 'Enero'
//   },
//   {
//     id: '2',
//     mes: 'Febrero'
//   },
//   {
//     id: '3',
//     mes: 'Marzo'
//   },
//   {
//     id: '4',
//     mes: 'Abril'
//   },
//   {
//     id: '5',
//     mes: 'Mayo'
//   },
//   {
//     id: '6',
//     mes: 'Junio'
//   },
//   {
//     id: '7',
//     mes: 'Julio'
//   },
//   {
//     id: '8',
//     mes: 'Agosto'
//   },
//   {
//     id: '9',
//     mes: 'Septiembre'
//   },
//   {
//     id: '10',
//     mes: 'Octubre'
//   },
//   {
//     id: '11',
//     mes: 'Noviembre'
//   },
//   {
//     id: '12',
//     mes: 'Diciembre'
//   }
// ];

//  jsonday = [
//   {
//     number: '1'
//   },
//   {
//     number: '2'
//   },
//   {
//     number: '3'
//   },
//   {
//     number: '4'
//   },
//   {
//     number: '5'
//   },
//   {
//     number: '6'
//   },
//   {
//     number: '7'
//   },
//   {
//     number: '8'
//   },
//   {
//     number: '10'
//   },
//   {
//     number: '11'
//   },
//   {
//     number: '12'
//   },
//   {
//     number: '13'
//   },
//   {
//     number: '14'
//   },
//   {
//     number: '15'
//   },
//   {
//     number: '16'
//   },
//   {
//     number: '17'
//   },
//   {
//     number: '18'
//   },
//   {
//     number: '19'
//   },
//   {
//     number: '20'
//   },
//   {
//     number: '21'
//   },
//   {
//     number: '22'
//   },
//   {
//     number: '23'
//   },
//   {
//     number: '24'
//   },
//   {
//     number: '25'
//   },
//   {
//     number: '26'
//   },
//   {
//     number: '27'
//   },
//   {
//     number: '28'
//   },
//   {
//     number: '29'
//   },
//   {
//     number: '30'
//   },
//   {
//     number: '31'
//   },

//  ];

  /** Variable globales */
  profileUser: FormGroup;
  @Input() dataUser: User;
  departaments: DepartamentAdmin[];
  cities: CityAdmin[];
  TypeDocuments: Parameter[];
  Gender: Parameter[];

  constructor(private formBuilder: FormBuilder, private contentWebService: ContentWebService, private spinner: NgxSpinnerService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.InitForm();
    this.UpdateInfoUser();
    this.getParameters(1);
    this.getParametersGender(3);
    
  }

  InitForm() {
    this.profileUser = this.formBuilder.group({
      nombres1:     ['Andres',  Validators.required],
      nombre2:      ['Pablo',  Validators.required],
      apellido1:    ['Jimenez',  Validators.required],
      apellido2:    ['Hernandez',  Validators.required],
      IdTipoDocumento:[1,  Validators.required],
      documento:    ['10245698',  Validators.required],
      genero:       ['',  Validators.required],
      address:      ['carrera 25',  Validators.required],
      nDepto:       [null,  Validators.required],
      nciudad:      [null,  Validators.required],
      f_nacimiento: [new Date("2011-01-01"),  Validators.required],      
      telefono:     ['7896523',  Validators.required],
      telefono2:    ['7896521'],
      Celular:      ['3132143569'],
      email:        ['geranjian@gmail.com',  Validators.required],
    });
  }

  UpdateInfoUser() {
    this.profileUser.patchValue({
      nombres1:     this.dataUser.nombres1,
      nombre2:      this.dataUser.nombre2,
      apellido1:   this.dataUser.apellido1,
      apellido2:   this.dataUser.apellido2,
      IdTipoDocumento: this.dataUser.IdTipoDocumento,
      documento:     this.dataUser.documento,
      genero:       this.dataUser.genero,
      f_nacimiento: new Date(this.dataUser.fechaNacimiento),
      address:      this.dataUser.direccion,
      nDepto:       null,
      nciudad:      null,
      telefono:     this.dataUser.telefono,
      telefono2:    this.dataUser.telefono2,
      email:        this.dataUser.email,
      Celular:      this.dataUser.Celular,
    });
  }

  async getArrayDepartament() {
    this.spinner.show();
    try {
      await this.contentWebService.getDepartament().subscribe((resp: ResponseApiContent) => {
        if (resp.status === 1) {
          this.spinner.hide();
          this.departaments = resp.data;
        } else {
          this.messageService.alertDanger(resp.msn);
          console.error('getArrayDepartament', resp.data);
        }
      });
    } catch (error) {
      console.error('getArrayDepartament en módulo Admin', error);
    }
  }

  async getCitiesArray(id) {
    const json = { IdDepartamento: id };
    this.spinner.show();
    try {
      await this.contentWebService.getCities(json).subscribe((resp: ResponseApiContent) => {
        if (resp.status === 1) {
          this.spinner.hide();
          this.cities = resp.data;
        } else {
          this.messageService.alertDanger(resp.msn);
          console.error('getCitiesArray', resp.data);
        }
      });
    } catch (error) {
      console.error('getCitiesArray modulo Admin', error);
    }
  }

  async getParameters(id) {
    const json = { id_param: id };
    this.spinner.show();
    try {
      await this.contentWebService.getParameterUser(json).subscribe((resp: ResponseApiContent) => {
        if (resp.status === 1) {
          this.spinner.hide();
          this.TypeDocuments = resp.data;
        } else {
          this.messageService.alertDanger(resp.msn);
          console.error('getCitiesArray', resp.data);
        }
      });
    } catch (error) {
      console.error('getCitiesArray modulo Admin', error);
    }
  }

  async getParametersGender(id) {
    const json = { id_param: id };
    this.spinner.show();
    try {
      await this.contentWebService.getParameterUser(json).subscribe((resp: ResponseApiContent) => {
        if (resp.status === 1) {
          this.spinner.hide();
          this.Gender = resp.data;
        } else {
          this.messageService.alertDanger(resp.msn);
          console.error('getCitiesArray', resp.data);
        }
      });
    } catch (error) {
      console.error('getCitiesArray modulo Admin', error);
    }
  }

  onSubmitProfile() {

    if (this.profileUser.invalid) {
      console.log('A', this.profileUser.value);
    } else {
      this.spinner.show();
      console.log('B', this.profileUser.value);     
      this.contentWebService.updatePerfil(this.profileUser.value).subscribe((response)=>{
        console.log(response);
        this.spinner.hide();
      }); 
    }
  }
  
}
