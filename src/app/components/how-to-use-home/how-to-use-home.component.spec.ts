import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverTwoComponent } from './how-to-use-home.component';

describe('DiscoverTwoComponent', () => {
  let component: DiscoverTwoComponent;
  let fixture: ComponentFixture<DiscoverTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoverTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
