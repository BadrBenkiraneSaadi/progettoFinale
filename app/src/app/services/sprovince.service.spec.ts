import { TestBed } from '@angular/core/testing';

import { SProvinceService } from './sprovince.service';

describe('SProvinceService', () => {
  let service: SProvinceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SProvinceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
