import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  Swal = require('sweetalert2');

  constructor(private router: Router) { }

  alertDanger(message) {
    this.Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  alertSuccess(message) {
    this.Swal.fire({
      icon: 'success',
      title: 'Proceso exitoso!',
      text: message,
    });
  }

  alertInfo(message) {
    this.Swal.fire({
      icon: 'warning',
      title: 'Ya casi está!',
      text: message,
    });
  }

  alertCotización(message) {
    this.Swal.fire({
      icon: 'warning',
      title: 'Ya casi está!',
      text: message,
      showCancelButton: true,
      confirmButtonText: `Continuar`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/loginRegister']);
      }
    });
  }

  alertCotizaciónSesion(message) {
    this.Swal.fire({
      icon: 'warning',
      title: 'Para registrar un servicio!',
      text: message,
      showCancelButton: true,
      confirmButtonText: `Continuar`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/loginRegister']);
      }
    });
  }

  toastSuccess(message) {
    this.Swal.fire({
      position: 'top-end',
      icon: 'warning',
      text: message,
      showConfirmButton: false,
      timer: 2000
    });
  }

  toastError(message) {
    this.Swal.fire({
      position: 'top-end',
      icon: 'error',
      text: message,
      showConfirmButton: false,
      timer: 3000,
      customClass: {
        popup: 'swal2-popup',
      }
    });
  }

  ContactError(message) {
    this.Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: 'Inicie sesión y vuelva a intentarlo',
      confirmButtonText: `Continuar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      }
    });
  }

}
