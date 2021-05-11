import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAvisoPrivacidadComponent } from './modal-aviso-privacidad.component';

describe('ModalAvisoPrivacidadComponent', () => {
  let component: ModalAvisoPrivacidadComponent;
  let fixture: ComponentFixture<ModalAvisoPrivacidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAvisoPrivacidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAvisoPrivacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
