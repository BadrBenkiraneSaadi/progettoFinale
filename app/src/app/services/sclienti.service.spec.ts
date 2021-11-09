import { TestBed } from '@angular/core/testing';

import { SClientiService } from './sclienti.service';

describe('SClientiService', () => {
  let service: SClientiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SClientiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
