import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Register } from '@src/app/shared/models/user';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  message = 'Campos obligatorios por confirmar';
  userLoginFormGroup: FormGroup;
  userRegisterFormGroup: FormGroup;
  selectedFormAuthentic = 0;
  formRegister: Register = new Register();
  formLogin: Register = new Register();
  hide = true;
  respError: any;
  viewOption = false;
  viewSelectLogin;
  

  constructor( public dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  viewSelectOption(state:boolean, viewSelect:number){
    this.viewOption = state;
    this.viewSelectLogin = viewSelect;
  }
  

}
