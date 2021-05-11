import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss']
})
export class FaqPageComponent implements OnInit {
  tittle = '¡Estamos aquí para ayudar!';
  breadcrumbTittle = 'Preguntas frecuentes';

  constructor() { }

  ngOnInit(): void {
  }

}
