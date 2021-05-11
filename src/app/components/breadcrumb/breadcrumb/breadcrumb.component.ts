import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() tittle: string;
  @Input() breadcrumbTittle: string;
  @Input() breadcrumbTittledetails: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
