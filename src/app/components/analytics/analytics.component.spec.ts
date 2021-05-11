import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaTwoComponent } from './analytics.component';

describe('CtaTwoComponent', () => {
  let component: CtaTwoComponent;
  let fixture: ComponentFixture<CtaTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtaTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtaTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
