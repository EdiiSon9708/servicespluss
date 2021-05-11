import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAutorizaDatosComponent } from './modal-autoriza-datos.component';

describe('ModalAutorizaDatosComponent', () => {
  let component: ModalAutorizaDatosComponent;
  let fixture: ComponentFixture<ModalAutorizaDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAutorizaDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAutorizaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
