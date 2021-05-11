import { TestBed } from '@angular/core/testing';

import { FormsPageService } from './forms-page.service';

describe('FormsPageService', () => {
  let service: FormsPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
