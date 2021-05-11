import { Component, OnInit, Input } from '@angular/core';

import { User } from '@src/app/shared/models/user';
import { MatDialog } from '@angular/material/dialog';
import { ChangeImageProfileComponent } from '../../modals/change-image-profile/change-image-profile.component';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-breadcrumb-admin',
  templateUrl: './breadcrumb-admin.component.html',
  styleUrls: ['./breadcrumb-admin.component.scss']
})
export class BreadcrumbAdminComponent implements OnInit {

  @Input() tittle: string;
  @Input() dataUser: User;
  userDatas:User;

  constructor(public dialog: MatDialog,private authService: AuthService) { }

  ngOnInit(): void {
    this.userDatas=this.authService.currentUservalue;
    this.authService.currentUser.subscribe((result:User)=>{
      this.userDatas = result;
    });
  }
  chageImage(){
          const dialogCotization = this.dialog.open(ChangeImageProfileComponent, {
            width: '700px',
          });
          dialogCotization.afterClosed().subscribe(result => result);
  }

}
