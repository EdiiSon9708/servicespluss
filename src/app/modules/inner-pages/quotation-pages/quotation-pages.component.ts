import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotation-pages',
  templateUrl: './quotation-pages.component.html',
  styleUrls: ['./quotation-pages.component.scss']
})
export class QuotationPagesComponent implements OnInit {
  tittle = 'Cotiza con nosotros';
  breadcrumbTittle = 'solicitar cotización';

  constructor() { }

  ngOnInit(): void {
  }

}
