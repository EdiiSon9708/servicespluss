import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPoliticaDatosComponent } from './modal-politica-datos.component';

describe('ModalPoliticaDatosComponent', () => {
  let component: ModalPoliticaDatosComponent;
  let fixture: ComponentFixture<ModalPoliticaDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPoliticaDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPoliticaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
