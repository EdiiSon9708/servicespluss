import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  onOpen = true;

  value = '';

  constructor() { }

  ngOnInit(): void {
  }

  onOpened() {
    this.onOpen = !this.onOpen;
  }

}
