import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImagesServiceComponent } from './modal-images-service.component';

describe('ModalImagesServiceComponent', () => {
  let component: ModalImagesServiceComponent;
  let fixture: ComponentFixture<ModalImagesServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalImagesServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImagesServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
