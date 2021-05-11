import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-check-mail',
  templateUrl: './check-mail.component.html',
  styleUrls: ['./check-mail.component.scss']
})
export class CheckMailComponent implements OnInit {
  tokenVerifyMail:string;
  constructor(private router: Router,private route: ActivatedRoute,private auth:AuthService) { }

  ngOnInit(): void {
    this.tokenVerifyMail = this.route.snapshot.paramMap.get('token');
    this.auth.checkMail({tokenPassword:this.tokenVerifyMail});
  }

}
