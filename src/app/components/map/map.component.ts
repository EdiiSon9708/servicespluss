import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';

import { MessageService } from '@core/services/message/message.service';

/** Libreria de google maps */
import { Location } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges{

  zoom: number;
  latitude = 0;
  longitude = 0;
  @Input() address: string;
  @Output() direccion = new EventEmitter<string>();
  private geoCoder;

  constructor( private mapsAPILoader: MapsAPILoader, private messageService: MessageService) { }

  ngOnInit(): void {
    // console.log('OnInit:',this.address); 
    this.loaderMapAndAutocomplete();
  }

  ngOnChanges(): void{
    this.getLocation(this.address);
    console.log('Onchanges:',this.address); 
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
    console.log(latitude, longitude);
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
    console.log('Getting address: ', address);
   
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
                console.log('Error: ', results, ' & Status: ', status);
                // observer.error();
            }
        });
    // });
  }
}
