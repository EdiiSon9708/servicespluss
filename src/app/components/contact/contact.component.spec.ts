import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactOneComponent } from './contact.component';

describe('ContactOneComponent', () => {
  let component: ContactOneComponent;
  let fixture: ComponentFixture<ContactOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
