import { Component, OnInit } from '@angular/core';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { User } from '@shared/models/user';

@Component({
  selector: 'app-change-image-profile',
  templateUrl: './change-image-profile.component.html',
  styleUrls: ['./change-image-profile.component.scss']
})
export class ChangeImageProfileComponent implements OnInit {
  user: User;
  public imagePath;
  imgURL: any='';
  public message: string;
  formData:FormData = new FormData();
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user =  this.authService.currentUservalue;
    this.imgURL = this.user.foto; 
  }
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    let formData:FormData = new FormData();
    this.formData.append('imagenperfil', files[0]);
    
        console.log(formData);
     this.authService.changeImageUser(formData);
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
  saveImage(){
    this.authService.changeImageUser(this.formData);
  }
}


