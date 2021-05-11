import { Component, NgZone, OnInit } from '@angular/core';

import { MapsAPILoader } from '@agm/core';

import { MessageService } from '@core/services/message/message.service';



@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  /** Variables globales */
  tittle = '¿No ha encontrado una respuesta adecuada?.';
  breadcrumbTittle = 'Contacto';

  zoom: number;
  latitude = 0;
  longitude = 0;
  address: string;
  private geoCoder;

  constructor(private mapsAPILoader: MapsAPILoader, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loaderMapAndAutocomplete();
  }

  /** Carga de mapa */
  loaderMapAndAutocomplete() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
    });
  }

  /** Get Current Location Coordinates */
  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude + 0.00010;
        this.longitude = position.coords.longitude + 0.005;
        this.zoom = 15;
        this.getAddress(this.latitude, this.longitude);
      });
    }
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

}
