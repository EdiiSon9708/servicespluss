import { TestBed } from '@angular/core/testing';

import { ContentWebService } from './content-web.service';

describe('ContentWebService', () => {
  let service: ContentWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
