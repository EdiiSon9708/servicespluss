import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationPagesComponent } from './quotation-pages.component';

describe('QuotationPagesComponent', () => {
  let component: QuotationPagesComponent;
  let fixture: ComponentFixture<QuotationPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
