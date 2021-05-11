import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InfoUbicationAndQuotations } from '@shared/models/form-page';
import { ProfessionalQuotation } from '@shared/models/content-page';

import { MessageService } from '@core/services/message/message.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/** Libreria de google maps */
import { Location } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { MapsAPILoader, MouseEvent } from '@agm/core';
// Scroll subir mapa
import { ScrollService } from '@src/app/core/services/scroll/scroll.service';


@Component({
  selector: 'app-modal-ubication',
  templateUrl: './modal-ubication.component.html',
  styleUrls: ['./modal-ubication.component.scss']
})
export class ModalUbicationComponent implements OnInit {

  /** Variables globales */
  formAddress: FormGroup;
  formCotization: InfoUbicationAndQuotations = new InfoUbicationAndQuotations();
  message = 'Campos obligatorios, se debe seleccionar minimo un profesional';
  checkedProfessional: ProfessionalQuotation[] = [];
  zoom: number;
  latitude = 0;
  longitude = 0;
  address: string;
  private geoCoder;
  usersExample = this.dataUser();
  

  constructor(private formBuilder: FormBuilder, private messageService: MessageService,
              private mapsAPILoader: MapsAPILoader, public dialog: MatDialog, public dialogRef: MatDialogRef<ModalUbicationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: InfoUbicationAndQuotations) { }

  ngOnInit(): void {
    this.InitFormAddress();
    this.loaderMapAndAutocomplete();
  }
  

  /** Formulario inicial para poner la ubicación del servicio */
  InitFormAddress() {
    this.formAddress = this.formBuilder.group({
      address: [null, Validators.required],
      latitude: [null],
      longitude: [null],
      // quotations: [null, Validators.required]
    });
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

  /** Seleccionar profesionales para cotización */
  // chekedProfessional(evt) {
  //   if (!this.checkedProfessional.includes(evt)) {
  //     this.checkedProfessional.push(evt);
  //   } else {
  //     const index = this.checkedProfessional.indexOf(evt);
  //     if (index > -1) {
  //       this.checkedProfessional.splice(index, 1);
  //     }
  //   }
  // }

  /** Guardar datos de ubicacion para generar cotización */
  onClickAddress() {
    if (this.formAddress.invalid) {
      this.messageService.toastError(this.message);
      return;
    } else {
      this.formCotization.address = this.formAddress.value.address.formatted_address;
      // this.formCotization.quotations = this.checkedProfessional;
      this.formCotization.latitude = this.latitude;
      this.formCotization.longitude = this.longitude;
      this.data = this.formCotization;
      this.dialogRef.close(this.data);
    }
  }

  dataUser() {
    return [
      {
        idProfessional: 1,
        name: 'Carlos Pertuz',
        photo: 'https://via.placeholder.com/70x70?text=70x70',
        city: 'Bogotá D.C.',
        departament: 'Bogotá D.C.'
      },
      {
        idProfessional: 2,
        name: 'Juliana Castellon',
        photo: 'https://via.placeholder.com/70x70?text=70x70',
        city: 'Funza',
        departament: 'Cundinamarca'
      },
      {
        idProfessional: 3,
        name: 'Julian Niño',
        photo: 'https://via.placeholder.com/70x70?text=70x70',
        city: 'Mosquera',
        departament: 'Cundinamarca'
      }
    ];
  }

}
