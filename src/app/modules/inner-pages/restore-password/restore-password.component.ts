import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {
  viewPassword:number;
  tokenPassword:string;

  constructor(private router: Router,private route: ActivatedRoute,private auth:AuthService,private spinner: NgxSpinnerService) { }
  
  ngOnInit(): void {
    this.tokenPassword = this.route.snapshot.paramMap.get('token');
    this.verifyToken();
  }
  verifyToken(){
    this.auth.verifyTokenRetorePassword({tokenPassword:this.tokenPassword}).subscribe((response)=>{
        this.spinner.hide();
        console.log(response);
        this.spinner.hide();
        if(response.status==0){
          this.viewPassword = 1;
          return;
        }
        this.viewPassword = 2;
    });
  }
  dirLogin(){
    this.router.navigate(['login'])
  }

}
