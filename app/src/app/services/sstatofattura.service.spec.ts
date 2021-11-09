import { TestBed } from '@angular/core/testing';

import { SStatofatturaService } from './sstatofattura.service';

describe('SStatofatturaService', () => {
  let service: SStatofatturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SStatofatturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
