import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';

import { Router } from '@angular/router';

import { ContentWebService } from '@core/services/content-web/content-web.service';
import { MessageService } from '@core/services/message/message.service';
import { FormsPageService } from '@core/services/forms-page/forms-page.service';
import { AuthService } from '@core/services/auth/auth.service';

import { ResponseApiContent } from '@shared/models/responseApi';
import { CategoryPage, SubCategoryPage } from '@shared/models/content-page';
import { User } from '@shared/models/user';
import { InfoUbicationAndQuotations } from '@shared/models/form-page';
import { CreateQuotation } from '@shared/models/form-page';

import { NgxSpinnerService } from 'ngx-spinner';
import { NgwWowService } from 'ngx-wow';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

/** Libreria de google maps */
import { Location } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { ParametrosService } from '@src/app/core/services/parametros/parametros.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { LocalServiceService } from '@core/services/localService/local-service.service';

// scroll mapa
import { ScrollService } from '@src/app/core/services/scroll/scroll.service';


function deptosAutocompleteStringValidator(validOptions: Array<string>): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let i = 0;
    validOptions.filter((depto)=>{
      if(depto['Nombre']===control.value){
          i++;
      }
    })
      if (i>0) {
        return null  /* valid option selected */
      }
      return { 'invalidAutocompleteString': { value: control.value } }
    
  }
}
function cityAutocompleteStringValidator(validOptions: Array<string>): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let i = 0;
    validOptions.filter((city)=>{
      
      if(city['Nombre']===control.value){
          i++;
      }
    })
      if (i>0) {
        return null  /* valid option selected */
      }
      return { 'invalidAutocompCity': { value: control.value } }
    
  }
}

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit {

  /** Variables globales */
  horizontalStepperStep1: FormGroup;
  horizontalStepperStep2: FormGroup;
  horizontalStepperStep3: FormGroup;
  formCotization: CreateQuotation = new CreateQuotation();
  categoriesQuotation: CategoryPage[];
  subCategories: SubCategoryPage[];
  idCategory = null;
  message = 'Campos obligatorios';
  dataUser: User;
  dataUbication: InfoUbicationAndQuotations;
  formUbication: InfoUbicationAndQuotations = new InfoUbicationAndQuotations();
  zoom: number;
  latitude = 0;
  longitude = 0;
  address: string;
  private geoCoder;
  countImages=0;
  
  /**
   * Variables autocomplete depto
   */

  deptos:any[] = [];
  filteredDeptos: Observable<any[]>;

  //autocomplete
  myControl: FormControl = new FormControl();
  myControl2: FormControl = new FormControl();
  
  /**
   * variable autocomplete ciudad
   */

  citys:any[] = [];
  filteredCitys: Observable<any[]>;
  placeCity='Digite Ciudad';

  
  
  //Mostrar Mapa
  xpandStatus=true;
  //Formulario Direccion
  formDireccion: FormGroup;
  //Check work or house
  


  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  // tslint:disable-next-line: ban-types
  humanizeBytes: Function;
  dragOver: boolean;

  constructor(private formBuilder: FormBuilder, private wowService: NgwWowService, private messageService: MessageService,
              private contentWebService: ContentWebService, private spinner: NgxSpinnerService,
              private router: Router, private formsPageService: FormsPageService, private authService: AuthService,
              private mapsAPILoader: MapsAPILoader,private parametros:ParametrosService,private localService: LocalServiceService, private scrollService:ScrollService ) {
    this.categoriesQuotation = this.contentWebService.currentCategoryvalue;
    this.dataUser = this.authService.currentUservalue;

    this.idCategory = this.router.getCurrentNavigation().extras.queryParams?.idCategory;
    if (this.idCategory) {
      
    }


    this.options = { concurrency: 1, maxUploads: 5, maxFileSize: 1000000 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  //scroll mapa
  scrollToId(id: string) {
    console.log("element id : ", id);
    this.scrollService.scrollToElementById(id);
  }
  scrollToElement(element: HTMLElement) {
    this.scrollService.scrollToElement(element);
  }
  


  public validation_msgs = {
    'myControl': [
      { type: 'invalidAutocompleteString', message: 'Departamento no valido!!' },
    ],
    'myControl2': [
      { type: 'invalidAutocompCity', message: 'Ciudad no valida!!' },
    ]
  }

  ngOnInit(): void {
 
    // if (!this.dataUser) {
    //     const msn = 'Clic en continuar, y regístrate';
    //     this.localService.setJsonValue('crear_servicio',1);
    //     this.messageService.alertCotizaciónSesion(msn);
    // }

    this.wowService.init();
    this.InitHorizontalStepperStep1();
    this.InitHorizontalStepperStep2();
    this.InitHorizontalStepperStep3();
    this.otherComponent(this.idCategory);
    this.loaderMapAndAutocomplete();
    this.initFormDireccion();
    this.parametros.departament().subscribe((resp)=>{
      
      
      this.deptos =resp.data;
      
      this.myControl = new FormControl('', 
        { validators: [deptosAutocompleteStringValidator(this.deptos), Validators.required] });
      
        this.filteredDeptos = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => val? this.filterDepto(val):this.deptos.slice())
      );
    })


   
    
  }

  /** Formulario cuando viene desde otra vista */
  otherComponent(id) {
    if (id) {
      this.horizontalStepperStep1.patchValue({
        categories: id
      });
    }
  }

  /** Formulario inicial primera parte de la cotizacion */
  InitHorizontalStepperStep1() {
    this.horizontalStepperStep1 = this.formBuilder.group({
      // categories: [null, Validators.required],
      // subcategories: [null, Validators.required]
      categories: [''],
      subcategories: ['']
    });
  }

  /** Formulario inicial segunda parte de la cotizacion */
  InitHorizontalStepperStep2() {
    this.horizontalStepperStep2 = this.formBuilder.group({
      // tittle: [null, Validators.required],
      // description: [null, Validators.required]
      tittle: [''],
      description: [''] 
    });
  }

  /** Formulario inicial tercera parte de la cotizacion */
  InitHorizontalStepperStep3() {
    this.horizontalStepperStep3 = this.formBuilder.group({
      address: [null, Validators.required],
      latitude: [null],
      longitude: [null],
      multiplefile: [null]
    });
  }

  /** Formulario direcciones */
  initFormDireccion() {
    this.formDireccion = this.formBuilder.group({
      neighborhood: [''],  
      via         : ['', Validators.required],
      complemento : [''],    
      sn          : [false],
 
    });
  }
  async save(event: Event) {
    
    
    
    event.preventDefault();
    if (this.formDireccion.valid) {
      let dirString = `${this.formDireccion.value.via} , ${this.myControl2.value}, colombia`;
      
      await this.getLocation(dirString);
      this.horizontalStepperStep3.value.address = dirString;
      this.formUbication.address = dirString;
      this.formUbication.complemento = this.formDireccion.value.complemento;
      this.formUbication.latitude = this.latitude;
      this.formUbication.longitude = this.longitude;
      this.dataUbication = this.formUbication;
      

    }
  }
  



  /** load Places Autocomplete */
  loaderMapAndAutocomplete() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentPosition();
      this.geoCoder = new google.maps.Geocoder();
    });
  }
  
  
  /** Get Current Location Coordinates */
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

   /** Get address with autocomplete */
   onAutocompleteSelected(result: PlaceResult) {
    this.address = result.formatted_address;
  }

  /** Get Coordinates in latitud y longitud with autocomplete */
  onLocationSelected(location: Location) {
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

  /** Get DragEnd Location Coordinates */
  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  /** Get address and Coordinates in latitud y longitud */
  getAddress(latitude, longitude) {
    
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 15;
          this.address = results[0].formatted_address;
        } else {
          this.messageService.toastError('No se han encontrado resultados');
        }
      } else {
        this.messageService.toastError(status);
        console.error('Error mapa metodo getAddress', status);
      }
    });
  }

  getLocation(address: string) {
    
   
    // return Observable.create(observer => {
      this.geoCoder.geocode({
            'address': address
        }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
              console.log(results[0].geometry.location.lat());
              console.log(results[0].geometry.location.lng());
              setTimeout(() =>{ 
                this.latitude = results[0].geometry.location.lat();
                this.longitude = results[0].geometry.location.lng();
                
              },1000)
              
                // observer.next(results[0].geometry.location);
                // observer.complete();
            } else {
                
                // observer.error();
            }
        });
    // });
}

  /** Guardar datos de ubicacion para generar cotización */
  onClickAddress() {
    if (this.horizontalStepperStep3.invalid) {
      this.messageService.toastError(this.message);
      return;
    } else {
      // this.formUbication.address = this.horizontalStepperStep3.value.address.formatted_address;
      this.formUbication.latitude = this.latitude;
      this.formUbication.longitude = this.longitude;
      this.dataUbication = this.formUbication;
      this.messageService.toastSuccess('Ubicación almacenada');
    }
  }


  /** Mostrar las subcategorias de las categorias */
  async onClickSubcategory(idCategory) {
    const json = { idCategoria: idCategory };
    this.spinner.show();
    try {
      await this.contentWebService.getSubCategories(json).subscribe((resp: ResponseApiContent) => {
        if (resp.status === 1) {
          this.spinner.hide();
          this.subCategories = resp.data;
        } else {
          this.messageService.alertDanger(resp.msn);
          console.error(resp.data);
        }
      });
    } catch (error) {
      console.error('Send id categoria para traer las subcategorias en el modulo cotización', error);
    }
  }

  /** Metodo primera parte del formulario para crear una cotización */
  onClickFormOne() {

    

    if (this.horizontalStepperStep1.invalid) {
      return this.messageService.toastError(this.message);
    } else {
      
        this.formCotization.idCategory = this.horizontalStepperStep1.value.categories;
        this.formCotization.idSubCategory = this.horizontalStepperStep1.value.subcategories;
        if (this.dataUser) {
        }else{
          // this.router.navigate(['/loginRegister']);
        }
      
        
      
    }
  }

  /** Metodo segunda parte del formulario para crear una cotización */
  onClickFormTwo() {
    if (this.horizontalStepperStep2.invalid) {
      return this.messageService.toastError(this.message);
    } else {
      this.formCotization.tittle = this.horizontalStepperStep2.value.tittle;
      this.formCotization.description = this.horizontalStepperStep2.value.description;
    }
  }

  /** Metodo para crear una cotización */
  async sendQuotation() {
    if (this.formDireccion.invalid) {
      
      return this.messageService.toastError(this.message);
      
    } else {
      if (this.dataUser) {


        
        this.spinner.show();
        this.formCotization.infoUbicationAndQuotations = this.dataUbication;
        this.formCotization.picture = this.horizontalStepperStep3.value.multiplefile;
        try {
          this.spinner.hide();
          await this.formsPageService.createService(this.formCotization).subscribe(resp => {
            console.log(resp);
            if (resp.status === 1) {
              this.startUpload(resp.data);
              this.spinner.hide();
              this.horizontalStepperStep3.get('address').reset();
              this.messageService.alertSuccess(resp.msn);
              this.router.navigate(['admin']);
            } else {
              this.spinner.hide();
              console.warn(resp.data);
              this.messageService.toastError(resp.msn);
            }
          });
        } catch (error) {
          
          this.spinner.hide();
          this.formsPageService.handlerError(error);
          console.error('Error sendQuotation en componente crear cotización', error);
        }
      } else {
        
        this.formCotization.infoUbicationAndQuotations = this.dataUbication;
        
        this.localService.setJsonValue('create_service',this.formCotization);
        const msn = 'Clic en continuar, y regístrate';
        this.messageService.alertCotización(msn);
      }
    }
  }


  // onUploadOutput(output: UploadOutput): void {
  //   switch (output.type) {
  //     case 'allAddedToQueue':
  //       // uncomment this if you want to auto upload files when added
  //       const event: UploadInput = {
  //         type: 'uploadAll',
  //         url: '/upload',
  //         method: 'POST',
  //         data: { foo: 'bar' }
  //       };
  //       this.uploadInput.emit(event);
  //       break;
  //     case 'addedToQueue':
  //       if (typeof output.file !== 'undefined') {
  //         this.files.push(output.file);
  //       }
  //       break;
  //     case 'uploading':
  //       if (typeof output.file !== 'undefined') {
  //         // update current data in files array for uploading file
  //         const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
  //         this.files[index] = output.file;
  //       }
  //       break;
  //     case 'removed':
  //       // remove file from array when removed
  //       this.files = this.files.filter((file: UploadFile) => file !== output.file);
  //       break;
  //     case 'dragOver':
  //       this.dragOver = true;
  //       break;
  //     case 'dragOut':
  //     case 'drop':
  //       this.dragOver = false;
  //       break;
  //     case 'done':
  //       // The file is downloaded
  //       break;
  //   }
  // }

  onUploadOutput(output: UploadOutput): void {
    // this.files = [];
    console.log('files',this.files);
    // this.countImages = this.files.length
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' }
      // };
      // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
      
      this.previewImagem(output.file).then(response => {
        let file: any = Object.assign(output.file, { imagePreview: response });
        this.files.push(file);
    });
      
      // this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
      console.log(output.file.name + ' rejected');
    }
  }
  
  previewImagem(file: any) {
    const fileReader = new FileReader();
    return new Promise(resolve => {
        fileReader.readAsDataURL(file.nativeFile);
        fileReader.onload = function (e: any) {
            resolve(e.target.result);
        }
    });
}
  startUpload(idServicio): void {
    const token = this.localService.getJsonValue('token');
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'https://api6.servicespluss.com/api/page/svImgsServicio',
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token },
      data: { idservicio:idServicio }
    };
    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }
  
  /**
   * obtener la ciudad apartir del departamento
   * @param id 
   */
  getCity(id:any){
   
    this.parametros.city({IdDepartamento:id}).subscribe((response) => {
      this.citys = [];
      this.citys = response.data;
      if(response.data.length==0){
        this.placeCity='No hay Ciduades';

        return;
      }
  
      this.placeCity='Digite Ciduad';

      this.myControl2 = new FormControl('', 
      { validators: [cityAutocompleteStringValidator(this.citys), Validators.required] });

      this.filteredCitys = this.myControl2.valueChanges
      .pipe(
        startWith(''),
        map(val => val? this.filterCity(val):this.citys.slice())
      );
      
    });
  }


  /**
   * filtro autocplete depto
   */
  filterDepto(val) {
    return this.deptos.filter(option=>
      option.Nombre.toLowerCase().includes(val.toLowerCase()));
  }

  /**
   * filtro autocomplete ciudad
   */
  filterCity(val) {
    
    return this.citys.filter(option=>
      option.Nombre.toLowerCase().includes(val.toLowerCase()));
  }
}
