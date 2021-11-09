import { TestBed } from '@angular/core/testing';

import { SComuniService } from './scomuni.service';

describe('SComuniService', () => {
  let service: SComuniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SComuniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
