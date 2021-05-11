import { Injectable } from '@angular/core';

/** Servicios para encryptar datos en el local storage */
import { StorageService } from '@core/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalServiceService {

  constructor(private storageService: StorageService) { }

  /** Set the json data to localstorage */
  setJsonValue(key: string, value: any) {
    this.storageService.secureStorage.setItem(key, value);
  }

  /** Get the json value from localstorage */
  getJsonValue(key: string) {
    return this.storageService.secureStorage.getItem(key);
  }

  /** Remove item the localstorage  */
  removeItem(key: string) {
    return this.storageService.secureStorage.removeItem(key);
  }

  /** Clear the localstorage  */
  clearToken() {
    return this.storageService.secureStorage.clear();
  }

}
