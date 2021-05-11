import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUbicationComponent } from './modal-ubication.component';

describe('ModalUbicationComponent', () => {
  let component: ModalUbicationComponent;
  let fixture: ComponentFixture<ModalUbicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUbicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUbicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
